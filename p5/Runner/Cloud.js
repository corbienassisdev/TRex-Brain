function Cloud() {
	
	this.width = 46;
	this.height = 13;

	this.x = width;
	this.y = floor(random(10, 60));
}


Cloud.prototype.update = function(speed) {

	this.x -= speed / 8;
};


Cloud.prototype.show = function() {

	fill(100,100,100);
	rect(this.x, this.y, this.width, this.height);
};