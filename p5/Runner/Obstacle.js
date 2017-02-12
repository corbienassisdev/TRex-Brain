function Obstacle() {

	this.width = 23;
	this.height = 46;

	this.x = width;
	this.y = 93;
	this.speed = 6;

	this.hightlight = false;

	this.show = function() {
		fill(255);
		if(this.hightlight)
			fill(255, 0, 0);
		rect(this.x, this.y, this.width, this.height);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.hits = function(tRex) {
		if (tRex.x < this.x + this.width && tRex.x + tRex.width > this.x &&
			tRex.y < this.y + this.height && tRex.height + tRex.y > this.y) {
		    this.hightlight = true;
		    return true;
		}
		this.hightlight = false;
		return false;
	}
}   