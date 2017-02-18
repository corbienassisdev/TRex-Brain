function Obstacle(sprites) {

	this.sprites = sprites;

	var cactus = [ 	
		'cactus.1',
		'cactus.2',
		'cactus.3',
		'cactus.4',
		'cactus.5',
		'cactus.6'
	];

	var type = random(cactus)
	this.sprite = sprites[type];

	this.width = this.sprite.width;
	this.height = this.sprite.height;

	this.x = width;
	this.y = height - (10 + this.sprite.height);
}


Obstacle.prototype.update = function(speed) {

	this.x -= speed;
};


Obstacle.prototype.show = function() {
	
	image(this.sprite, this.x, this.y);
};


Obstacle.prototype.hits = function(tRex) {

	if (tRex.x < this.x + this.width && tRex.x + tRex.width > this.x &&
		tRex.y < this.y + this.height && tRex.height + tRex.y > this.y) {
		// Il faudrait faire un second if pour la collision pixel par pixel
		// https://forum.processing.org/two/discussion/4657/per-pixel-collision-detection
		if(this.pixelOverlap(tRex))
			return true;
	    
	}
	
	return false;
};


Obstacle.prototype.pixelOverlap = function(tRex) {
	var img1 = this.sprite;
	var img2 = tRex.sprite;

	var x1 = this.x;
	var x2 = tRex.x;
	var y1 = this.y;
	var y2 = tRex.y;
	var h1 = this.height;
	var h2 = tRex.height;
	var w1 = this.width;
	var w2 = tRex.width;

	img1.loadPixels();
	img2.loadPixels();

	var top = max(y1, y2);
	var bottom = min(y1+h1, y2+h2);
	var left = max(x1, x2);
	var right = min(x1+w1, x2+w2);

	for(var y = top; y < bottom; y++) {

		for(var x = left; x < right; x++) {

			var color1 = img1.get((x - x1), (y - y1));
			var color2 = img2.get((x - x2), (y - y2));

			if(alpha(color1) != 0 && alpha(color2) != 0)
				return true; 
		}
    }
    return false;
}


Obstacle.type = {
	CACTUS: 'CACTUS',
	PTERODACTYL: 'PTERODACTYL'
};