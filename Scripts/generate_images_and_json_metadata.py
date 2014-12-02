"""This program will walk the image directory specified and generate a basic JSON object listing properties of the available images """
import os,sys,glob,re,json,shutil
from PIL import Image
import nibabel
import img_gen_common_functions as igcf

data_set_id = 'REMBRANDT Radiogenomics'
data_set_path_prefix = 'Rembrandt2014/'  ## Location of the NII images
### Base path where the HTML file will live

html_path_root = '/var/www/TumorView/PNG_IMAGES/'


###  To make things easier, I just create a symlink for the NII files of interest...
data_set_path_base_symlink = 'Rembrandt2014/'
background_image_globpath = '*nii.gz'

nii_base_path = '/bigdata/GIT_ONLINE_REPOS/TumorView/NII_Image_Data/'

img_set_dict = { "t1_img": { 'name_for_btn': 'T1', 'base_image': "BackGround/*AXIAL-T1-POST-GD_*.nii*", "masks": "*AXIAL-T1-POST-GD*.nii*" },
		 "t2_img": { 'name_for_btn': 'T2', 'base_image': "BackGround/*FLAIR*.nii*" , "masks": "*FLAIR*.nii*" }
		}

### FIRST GET THE LIST OF EXPT/SCAN DIRS
counter = 0

all_subject_expt_info_list = igcf.get_radiogenomics_expt_scan_list( nii_base_path + data_set_path_prefix ) 
print len(all_subject_expt_info_list),"subject scan combos available"

""" I will generate two JSON objects... or maybe one for each image... will debate this:
First json object will simply be a list of patient ID's... and the second one will be the index in the "big"
json object that contains the specific info needed to open up the subject image
"""

### GET THE MAP OF THE NII IMAGES FOR THIS SUBJECT
## SETUP NIPYPE CACHING MODULE
import nipype.pipeline.engine as pe
import nipype.interfaces.fsl as fsl
from nipype import config
from nipype.interfaces.utility import Function
import nipype.interfaces.io as nio
import nipype.interfaces.utility as util
from nipype.interfaces.utility import Merge
from nipype.interfaces import fsl
from nipype.caching import Memory
mem = Memory(base_dir='.nipype_cache/')


## Set up the slicer/fsl wrapper function
gen_png_images = mem.cache(fsl.Slicer)
gen_png_images.image_width=1280
gen_png_images.all_axial=True
gen_png_images.label_slices = True
gen_png_images.show_orientation = True


png_img_width = 1280

image_metadata_dict = {}

counter = 0

def generate_scanset_metadata( image_set_dictionary, html_base_path, session_id ):
	"""This is passed a set of NII images, their PNG equilvalents, and an html base path, and then it generates the metadata needed """
	cur_subj_info = {}

	"""need to think through the data structure a bit more.... but can always adjust later """
	cur_subj_info['session_id'] = session_id
	#cur_subj_info['img_id'] = counter
	cur_subj_info['subject_id'] = session_id.split('/')[0]
	global counter
	
	nii_image_dict = image_set_dictionary['nii_images']
	png_image_dict = image_set_dictionary['png_image_set']

	scan_metadata = {}
	for scan in nii_image_dict:
		print "propcessing ", scan
		nii_img =  nii_image_dict[scan]['base_image'][0]
		print nii_img
#		if 'mask' not in scan:

#		if 'mask' not in scan:
#			nii_img =  nii_image_dict[scan]['base_image'][0]
#		else:
#			continue
#		print "HI DAVE!"


		if not nii_img:
			print "did not find base image for",nii_image_dict
			continue
		png_img =  html_path_root+ png_image_dict[scan]
		print nii_img,"is being passed"

		(dim_x, dim_y, dim_z, vox_size_x, vox_size_y, vox_size_z, image_orientation )=  igcf.get_nii_image_info(nii_img)
		image_info = Image.open(png_img)
		width, height = image_info.size
		#print width,height,dim_x,dim_y,dim_z,vox_size_x,vox_size_y,vox_size_z	
		scan_info = {}
		scan_info['slice_width'] = dim_x
		scan_info['slice_height'] = dim_y
		scan_info['num_slices'] = dim_z
		scan_info['main_image_width'] = width
		scan_info['main_image_height'] = height
		scan_info['nii_image'] = nii_img
		scan_info['base_url'] = png_img.replace(html_path_root,'')
		scan_metadata[scan] = scan_info

		### There can be one or MORE masks for a given base image... so I will return a list of
		#dictionaries..
		mask_list = nii_image_dict[scan]['masks']
		mask_id = 0

		mask_info_list = []
		for mask in mask_list:
			cur_mask_info = {}
			### I'll call the mask by it's basename
			print mask,"was passed..."
			mask_base = os.path.basename(mask)
			nii_img =  nii_image_dict[scan]['masks'][mask_id]
			print nii_image_dict,'mask_id is',mask_id
			print "nii maeg found should be",nii_img
			if not nii_img:
				print "did not find a valid mask image for ",nii_image_dict
				continue


			cur_mask_info['name'] = mask_base
			cur_mask_info['id'] = mask_id
			cur_mask_info['nii_file'] = nii_img
			## NEED TO ADD IN THE MASK_URL
#			cur_mask_info['mask_url'] = 			
			print png_image_dict
			png_img =  html_path_root+ png_image_dict[scan]
			print nii_img,"is being passed"
			cur_mask_info['mask_url'] = png_img.replace(html_path_root,'')

			mask_info_list.append( cur_mask_info )
	
		
			mask_id +=1
#		print cur_mask_info
		cur_subj_info['masks'] = mask_info_list
		scan_metadata[scan]['masks'] = [ mask_info_list]
#		print mask_info_list

	cur_subj_info['image_data'] = scan_metadata
	counter += 1	
	return { 'session_name': session_id     , 'session_metadata': cur_subj_info }

all_subject_info_dict = igcf.AutoVivification()

for subj_expt in all_subject_expt_info_list:
	pt_nii_dict = igcf.find_nii_image_set( subj_expt, img_set_dict, nii_base_path, data_set_path_prefix)
	print pt_nii_dict,"is what i found..."
	pt_scan_info = {}
	pt_scan_info['nii_list'] = pt_nii_dict
	pt_scan_info['scan_types'] = pt_nii_dict.keys()

	#print subj_expt, pt_scan_info
	cur_subj_expt_dict = {}
	cur_subj_expt_dict['nii_images'] = pt_nii_dict
	cur_subj_expt_dict['scan_types'] = pt_nii_dict.keys()
	session_id = subj_expt  ### main variable used to select a scan set---   the subj/expt list

	png_info_dict = {}
	for img_class in pt_nii_dict:
	    for img_type in pt_nii_dict[img_class]:

		print img_class,img_type
		
		counter  += 1
		print pt_nii_dict,'is patient nii dict..'
		nii_filepath =  pt_nii_dict[img_class][img_type]
		for nii in nii_filepath:
   		    print nii	
		    if os.path.isfile( nii):
			png_metadata = gen_png_images(in_file=nii, all_axial=True,image_width=png_img_width, label_slices = True, show_orientation=True)
			png_file =  png_metadata.outputs.out_file
			## also copy the file to the directory...
			html_img_dir_target = os.path.join( html_path_root, 'LOCAL_IMAGE_CACHE', data_set_path_base_symlink, subj_expt)
			#print html_img_dir_target
			if not os.path.isdir( html_img_dir_target):
				os.makedirs( html_img_dir_target)
			## syntax below is a mess... basically I want to copy png I just crated to the cache.. but I don't want to copy it if it's
			#already there, so I have to join the filename with the directory I am trying to copy TO ...
			
			target_png_filename = os.path.join( html_img_dir_target, os.path.basename( png_file) )

			if not os.path.isfile( target_png_filename ):
				shutil.copy( png_file, html_img_dir_target)
			png_info_dict[ img_class ] =  os.path.join( 'LOCAL_IMAGE_CACHE', data_set_path_base_symlink, subj_expt ,os.path.basename( png_file)   )  
	cur_subj_expt_dict['png_image_set'] = png_info_dict	

	print cur_subj_expt_dict
	scan_metadata = generate_scanset_metadata( cur_subj_expt_dict,  html_path_root, subj_expt )
	## this is a bit confusing I realize... the returneed scan metadata is an expansion of what
	# I fed it.. with more parameters
	(subj_name, scan_name ) = subj_expt.split('/')
	
	all_subject_info_dict[subj_name][scan_name] = scan_metadata
#	subject_select_box_info.append({'id':counter,'subject_id':session_id})

#select_box_json = open('gbm_select_box_v1.json','w')
all_subj_data_json = open('gbm_subj_data_v1.json','w')

#print all_subject_info_list	
#print subject_select_box_info
#select_box_json.write( json.dumps(subject_select_box_info) )
all_subj_data_json.write( json.dumps(all_subject_info_dict) )

