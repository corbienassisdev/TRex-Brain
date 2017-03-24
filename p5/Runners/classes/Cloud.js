function Cloud(sprites) {
	
	this.width = 46;
	this.height = 13;

	this.x = width;
	this.y = floor(random(10, 60));

	this.sprite = sprites['cloud'];
}


Cloud.prototype.update = function(speed) {

	this.x -= speed / 8;
};


Cloud.prototype.show = function() {

	image(this.sprite, this.x, this.y);
};