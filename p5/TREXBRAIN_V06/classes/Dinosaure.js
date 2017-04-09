function Dinosaure(brain) {
	
	this.brain = brain;

	this.y = 95;
	this.x = 18;

	this.yGround = 95;

	this.gravity = 0.6;
	this.velocity = 0;

	this.jumps = 0; //nombre de sauts

	this.jumping = false;
	this.ducking = false;
	this.brainduck = false;

	this.status = Dinosaure.status.WAITING
}

Dinosaure.prototype.initialize = function(game) {
	
	this.game = game;

	this.sprite = this.game.sprites['trex.stand'];
	this.height = this.sprite.height;
	this.width = this.sprite.width;

	this.brain.initialize(this);
};

Dinosaure.prototype.update = function() {

	this.y += this.velocity;
	this.velocity += this.gravity;

	//blocage sol
	if(this.y > this.yGround) {
		this.y = this.yGround;
		this.velocity = 0;
	}

	//fin du saut
	if(this.jumping && this.y >= this.yGround) {
		this.jumping = false;
	}

	//check saut
	if(!this.jumping && (keyIsDown(UP_ARROW) || keyIsDown(32))) { //key code 32 = spacebar
		this.jump();
	}

	//check accroupir
	if(keyIsDown(DOWN_ARROW) || this.brainduck) {
		this.ducking = true;
	} else {
		this.ducking  = false;
	}

	if(this.ducking) {
		//si le tRex est debout sur le sol
		if(this.y == this.yGround) { 
			this.status = Dinosaure.status.DUCKING;
			this.y = this.yGround + 47 - 30;
			this.height = this.sprite.height;
		//si le tRex est en l'air
		} else { 
			this.velocity += 1;
		}
	} else {
		this.height = this.sprite.height;
	}

	if(!this.jumping && !this.ducking && this.status != Dinosaure.status.CRASHED)
		this.status = Dinosaure.status.RUNNING;

	this.brain.update();
};


Dinosaure.prototype.show = function() {

	switch (this.status) {
		case Dinosaure.status.WAITING:
			this.sprite = this.game.sprites['trex.stand'];
			break;
		case Dinosaure.status.RUNNING:
			if (floor(Game.frame % 10) < 5) //vrai pour 5 frames puis faux, etc
				this.sprite = this.game.sprites['trex.run.1'];
			else
				this.sprite = this.game.sprites['trex.run.2'];
			break;
		case Dinosaure.status.DUCKING:
			if (floor(Game.frame % 10) < 5) //vrai pour 5 frames puis faux, etc
				this.sprite = this.game.sprites['trex.duck.1'];
			else
				this.sprite = this.game.sprites['trex.duck.2'];
			break;
		case Dinosaure.status.JUMPING:
			this.sprite = this.game.sprites['trex.stand'];
			break;
		case Dinosaure.status.CRASHED:
			this.sprite = this.game.sprites['trex.crashed'];
			break;
	}

	context.drawImage(this.sprite, this.x, this.y);
};


Dinosaure.prototype.jump = function() {

	if(!this.jumping && !this.ducking) {
		this.status = Dinosaure.status.JUMPING;
		this.game.sounds['jump'].play();
		this.jumping = true;
		this.velocity = -10.2;
		this.jumps++;
	}
};


Dinosaure.prototype.duck = function() {

	this.brainduck = true;
};


Dinosaure.prototype.hits = function(obstacle) {

	if (this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x &&
		this.y < obstacle.y + obstacle.height && this.height + this.y > obstacle.y) {

		//if(this.pixelOverlap(this))
			return true;
	}
	return false;
};


Dinosaure.prototype.pixelOverlap = function(obstacle) {
	
	var img1 = obstacle.sprite;
	var img2 = this.sprite;

	var x1 = obstacle.x;
	var x2 = this.x;
	var y1 = obstacle.y;
	var y2 = this.y;
	var h1 = obstacle.height;
	var h2 = this.height;
	var w1 = obstacle.width;
	var w2 = this.width;

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
};


Dinosaure.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    DUCKING: 'DUCKING',
    JUMPING: 'JUMPING',
    CRASHED: 'CRASHED'
};
