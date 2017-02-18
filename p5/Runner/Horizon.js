function Horizon(sprites) {

	this.sprites = sprites;

	this.sprite = sprites['horizon'];
	this.x = 0;
	this.y = 130;

	this.spriteBis = sprites['horizon'];
	this.xBis = 1200;
	this.yBis = 130;
}


Horizon.prototype.update = function(speed) {

	if (this.x <= -1800 + 2)
		this.x = width;
	
	if(this.xBis <= -1800 + 2)
		this.xBis = width;

	this.x -= speed;
	this.xBis -= speed;
};


Horizon.prototype.show = function() {
	image(this.sprite, this.x, this.y);
	image(this.spriteBis, this.xBis, this.yBis);
};

