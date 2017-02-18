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
		return true;
	    
	}
	
	return false;
};


Obstacle.type = {
	CACTUS: 'CACTUS',
	PTERODACTYL: 'PTERODACTYL'
};