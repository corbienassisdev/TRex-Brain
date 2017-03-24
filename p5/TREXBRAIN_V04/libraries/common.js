function common() {

}

common.loadImage = function(path) {
	var image = new Image();
	image.src = path;
	
	return image;
}