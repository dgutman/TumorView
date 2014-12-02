### This will turn all of the MASK images into a transprent background to make overlays look less weird
for i in */*/*mask.png; do echo $i; convert $i -transparent black $i; done;
for i in */*/*MASK.png; do echo $i; convert $i -transparent black $i; done;
