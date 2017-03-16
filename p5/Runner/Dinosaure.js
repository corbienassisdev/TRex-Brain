function Dinosaure(sprites, game) {
	
	this.sprites = sprites;

	this.y = 95;
	this.x = 18;

	this.yGround = 95;

	//gestion de la gravité
	this.gravity = 0.6;
	this.velocity = 0;

	this.jumping = false;
	this.ducking = false;

	this.sprite = this.sprites['trex.stand'];

	this.height = this.sprite.height;
	this.width = this.sprite.width;

	this.status = Dinosaure.status.WAITING //pour les sprites

	this.brain = new Brain(game);
}


Dinosaure.prototype.update = function(sounds) {

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
		this.jump(sounds);
	}

	//check accroupir
	if(keyIsDown(DOWN_ARROW)) {
		this.ducking = true;
	} else {
		this.ducking  = false;
	}

	if(this.ducking) {
		if(this.y == this.yGround) { //si le tRex est debout sur le sol
			this.status = Dinosaure.status.DUCKING;
			this.y = this.yGround + 47 - 30;
			this.height = this.sprite.height;
		} else { //si le tRex est en l'air
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
			this.sprite = this.sprites['trex.stand'];
			break;
		case Dinosaure.status.RUNNING:
			if (floor(frameCount % 10) < 5) //vrai pour 5 frames puis faux, etc
				this.sprite = this.sprites['trex.run.1'];
			else
				this.sprite = this.sprites['trex.run.2'];
			break;
		case Dinosaure.status.DUCKING:
			if (floor(frameCount % 10) < 5) //vrai pour 5 frames puis faux, etc
				this.sprite = this.sprites['trex.duck.1'];
			else
				this.sprite = this.sprites['trex.duck.2'];
			break;
		case Dinosaure.status.JUMPING:
			this.sprite = this.sprites['trex.stand'];
			break;
		case Dinosaure.status.CRASHED:
			this.sprite = this.sprites['trex.crashed'];
			break;
	}
	image(this.sprite, this.x, this.y);
};


Dinosaure.prototype.jump = function(sounds) {

	if(!this.jumping && !this.ducking) {
		this.status = Dinosaure.status.JUMPING;
		sounds['jump'].play();
		this.jumping = true;
		this.velocity = -10.2;
	}
};


Dinosaure.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    DUCKING: 'DUCKING',
    JUMPING: 'JUMPING',
    CRASHED: 'CRASHED'
};