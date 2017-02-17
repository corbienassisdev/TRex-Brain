function Dinosaure(sprites) {
	this.y = 93;
	this.x = 18;

	this.height = 47;
	this.width = 44;

	this.yGround = 93;

	//gestion de la gravité
	this.gravity = 0.6;
	this.velocity = 0;

	this.jumping = false;
	this.ducking = false;

	this.sprites = sprites;
}


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
		game.tRex.jump();
	}

	//check accroupir
	if(keyIsDown(DOWN_ARROW)) {
		this.ducking = true;
	} else {
		this.ducking  = false;
	}

	if(this.ducking) {
		if(this.y == this.yGround) { //si le tRex est debout sur le sol
			this.y = this.yGround + 47 - 30;
			this.height = 30;
		} else { //si le tRex est en l'air
			this.velocity += 1;
		}
	} else {
		this.height = 47;
	}
};


Dinosaure.prototype.show = function() {

	//fill(255);
	//rect(this.x, this.y, this.width, this.height);
	image(this.sprites['trex.stand'], this.x, this.y);
};


Dinosaure.prototype.jump = function() {

	if(!this.jumping) {
		this.jumping = true;
		this.velocity = -10.5;
	}
};


Dinosaure.status = {
    CRASHED: 'CRASHED',
    DUCKING: 'DUCKING',
    JUMPING: 'JUMPING',
    RUNNING: 'RUNNING',
    WAITING: 'WAITING'
};