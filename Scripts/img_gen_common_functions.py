import nipype, os, re, glob


class AutoVivification(dict):
    """Implementation of perl's autovivification feature."""
    """ this is very interesting-- will automatically make "alive" a value if you call it.."""

    def __getitem__(self, item):
        try:
            return dict.__getitem__(self, item)
        except KeyError:
            value = self[item] = type(self)()
            return value

def get_nii_image_info(nifti_input_file):
	import nibabel as nib
	img = nib.load(nifti_input_file)
	nii_img_info = {}
	"""may refactor this to return a dictionary...."""
	img_shape =  img.get_shape()
	img_header = img.get_header()['pixdim'][1:4]
	
	image_size_data = {}

	dim_x = img_shape[0]
	dim_y = img_shape[1]
	dim_z = img_shape[2]
	vox_size_x = img_header[0]
	vox_size_y = img_header[1]
	vox_size_z = img_header[2]

	image_size_data['dim_x'] = img_shape[0]
	image_size_data['dim_y'] = img_shape[1]
	image_size_data['dim_z'] = img_shape[2]
	image_size_data['vox_size_x'] = img_header[0]
	image_size_data['vox_size_y'] = img_header[1]
	image_size_data['vox_size_z'] = img_header[2]

	""" May be a better way to do this, but I also compute the plane with the highest resolution
        which in theory should represent the image acquisition plane, but of course you can always
        resample the image and break these assumptions"""
	image_orientation = ""    ## I guess in theory this will fail to yield a value in the event
                                  ## someone cut/resized/did something weird to the acquistion window
                                  ## it of course doesn't HAVE to be a square matrix for the inplane
                                  ## probably could just figure out the smallest axis which should
                                  ## refer to the Sliced dimension
	if(    dim_x  == dim_y ): image_orientation = 'axial'
	elif(  dim_y  == dim_z ): image_orientation = 'sagittal'
	elif(  dim_x  == dim_z ): image_orientation = 'coronal'
	return dim_x, dim_y, dim_z, vox_size_x, vox_size_y, vox_size_z, image_orientation


def get_radiogenomics_expt_scan_list( radiogenomics_base_path ):
	"""This will scan the radiogenomics dj curated folder and get the list of individual patient/session available
	each patient has  a SUBJECT_ID and then an EXPT DIR"""
	##just using os.listdir for this
	subj_expt_dir_list = [ dir for dir in glob.glob( radiogenomics_base_path+'*/*') if os.path.isdir(dir)]
	#print subj_expt_dir_list
	#print radiogenomics_base_path	
	SUBJ_EXPT_LIST = []
	for subexp in subj_expt_dir_list:
		SUBJ_EXPT_LIST.append( subexp.replace( radiogenomics_base_path, '' ))
	return SUBJ_EXPT_LIST


def find_nii_image_set(session_id_string,data_dict,search_path, data_set_path_prefix):
	"""This will look for the t1, t1 mask, t2 and t2 flair for a given session id.... """
	#print session_id_string
	pt_img_map = AutoVivification()
	search_path = search_path + data_set_path_prefix
	for key in data_dict:
		## get background image
		for img_type in ['base_image','masks']:

			#print key,data_dict,img_type
			glob_path  = ( os.path.join( search_path, session_id_string,data_dict[key][img_type] )  )
			## sesion id string no longer in here..
			#% session_id_string
			"""Just inserted the session id into the glob string """
			#	print glob_path
			file_list = glob.glob(glob_path)
			if len(file_list) == 1:
				pt_img_map[key][img_type] = [file_list[0].replace(data_set_path_prefix,'')]
			else:
				continue
				print "-----MORE THAN ONE IMAGE FOUND-------",file_list		
			## need to generate a compound object...
			#print "unmatched file for",glob_path
	#print pt_img_map
	return pt_img_map


