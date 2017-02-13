function Game() {
	
	this.tRex = new Dinosaure();
	this.horizon = new Horizon();
	this.obstacles = [];
	this.clouds = [];
}

Game.prototype.update = function() {

	if(frameCount % 80 == 0) { //toutes les X frames
		this.obstacles.push(new Obstacle());
	}

	if(frameCount % 250 == 0) {
		this.clouds.push(new Cloud());
	}

	for (var i = this.obstacles.length - 1; i > 0; i--) {
		this.obstacles[i].update();

		if(this.obstacles[i].hits(this.tRex)) { //ca devrait etre dans Dinosaure.js plutot
			console.log('HIT');
		}

		if(this.obstacles[i].x < -20) {
			this.obstacles.splice(i, 1);
		}
	}

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].update();

		if(this.clouds[i].x < - this.clouds[i].width) {
			this.clouds.splice(i, 1);
		}
	}

	this.tRex.update();
};


Game.prototype.show = function() {

	background(0);
	this.horizon.show();

	for (var i = this.obstacles.length -1; i > 0; i--) {
		this.obstacles[i].show();
	}

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].show();
	}

	this.tRex.show();
};