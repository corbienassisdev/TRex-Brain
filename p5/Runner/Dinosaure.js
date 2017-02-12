function Dinosaure() {
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

	this.show = function() {
		fill(255);
		rect(this.x, this.y, this.width, this.height);
	}

	this.update = function() {
		
		this.y += this.velocity;
		this.velocity += this.gravity;

		//blocage sol
		if(this.y > this.yGround) {
			this.y = this.yGround;
			this.velocity = 0;
		}

		//fin du saut
		if(this.jumping && this.y == this.yGround) {
			this.jumping = false;
		}

		//check saut
		if(!this.jumping && keyIsDown(UP_ARROW)) {
			this.jumping = true;
			this.velocity = -10.5;
		}

		//check accroupir
		if(keyIsDown(DOWN_ARROW)) {
			this.ducking = true;
		} else {
			this.ducking  = false;
		}

		if(this.ducking) {
			if(this.y == 93) { //si le tRex est debout sur le sol
				this.y = 93 + 47 - 30;
				this.height = 30;
			} else { //si le tRex est en l'air
				this.velocity += 1;
			}
		} else {
			this.height = 47;
		}
	}

	this.jump = function() {
		this.velocity += -10 ;
	}
}

/*
function Dinosaure() {
	this.xPos;
    this.yPos;
    this.status;
	this.jumping;
	this.ducking;
	this.sprite;

	this.init = function() {
		this.xPos = 0;
	    this.yPos = 95;
	    this.status = Dinosaure.status.WAITING;
		this.jumping = false;
		this.ducking = false;
		this.sprite = loadImage('sprites/trex_stand.png');
	}

	this.update = function () {
		if(keyIsDown(UP_ARROW))
			this.jumping = true;
		if(keyIsDown(DOWN_ARROW))
			this.ducking = true;

		if(this.jumping)
			console.log('est en train de sauter');
		if(this.ducking)
			console.log('est baissé');
	}

	this.display = function() {
		image(this.sprite, 25, this.yPos);
	}
}

Dinosaure.status = {
    CRASHED: 'CRASHED',
    DUCKING: 'DUCKING',
    JUMPING: 'JUMPING',
    RUNNING: 'RUNNING',
    WAITING: 'WAITING'
}; */