function Cloud() {
	
	this.width = 46;
	this.height = 13;

	this.x = width;
	this.y = 30;
	this.speed = 1;

	this.hightlight = false;
}


Cloud.prototype.update = function() {

	this.x -= this.speed;
};


Cloud.prototype.show = function() {

	fill(100,100,100);
	rect(this.x, this.y, this.width, this.height);
};