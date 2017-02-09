function Dinosaure() {
	this.position = {x: 25, y: 95};
	this.state; //standing, running, jumping, ducking
	this.sprite;

	this.init = function() {
		this.position;
		this.state;
		this.sprite = loadImage('sprites/trex_stand.png');
	}

	this.jump = function() {
		console.log('le dinosaure saute');
	}

	this.duck = function() {
		console.log('le dinosaure se baisse');
	}

	this.run = function () {
		if(keyIsDown(UP_ARROW))
			this.jump();
		if(keyIsDown(DOWN_ARROW))
			this.duck();
	}

	this.display = function() {
		image(this.sprite, this.position.x, this.position.y);
	}
}