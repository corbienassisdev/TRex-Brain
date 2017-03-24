function Obstacle(game) {

	this.game = game;
	this.sprite;
	this.x = this.game.p5.canvas.width;
	this.type;

	var cactus = ['cactus.1', 'cactus.2', 'cactus.3', 'cactus.4', 'cactus.5', 'cactus.6'];

	if(this.game.score >= 400 && this.game.p5.floor(this.game.p5.random(0, 3)) == 0) { //1 chance sur 3 si le score > 500
		this.type = Obstacle.type.PTERODACTYL;
		this.sprite = this.game.sprites['pterodactyl.fly.1'];
		this.y = this.game.p5.floor(this.game.p5.random(0, 3)) * 30 + 45;

	}
	else {
		this.type = Obstacle.type.CACTUS;
		this.sprite = this.game.sprites[this.game.p5.random(cactus)];
		this.y = this.game.p5.height - (10 + this.sprite.height);
	}

	this.width = this.sprite.width;
	this.height = this.sprite.height;
}


Obstacle.prototype.update = function(speed) {

	switch(this.type) {
		case Obstacle.type.CACTUS:
			this.x -= speed;
			break;
		case Obstacle.type.PTERODACTYL:
			this.x -= speed * 1.2;
			break;
	}
};


Obstacle.prototype.show = function() {

	if (this.type == Obstacle.type.PTERODACTYL) {

		if (this.game.p5.floor(this.game.p5.floorframeCount % 20) < 10) //vrai pour 5 frames puis faux, etc
			this.sprite = this.game.sprites['pterodactyl.fly.1'];
		else
			this.sprite = this.game.sprites['pterodactyl.fly.2'];
	}
	
	this.game.p5.image(this.sprite, this.x, this.y);
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