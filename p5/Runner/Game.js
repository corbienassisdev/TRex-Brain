function Game() {
	
	this.tRex = new Dinosaure();
	this.horizon = new Horizon();
	this.obstacles = [];
	this.clouds = [];
	this.score = 0;
	this.highscore = 0;
	this.status = Game.status.WAITING;
}


Game.prototype.wait = function() {
	background(0);
	this.horizon.show();
	this.tRex.show();

	var scoreString = this.score + "";
	fill(255);
	text(this.score, width - (scoreString.length * 6) - 15, 20);

	noLoop();
};


Game.prototype.over = function() {
	fill(255);
	rect((width - 191) / 2, 30, 191, 20);
	rect((width - 34) / 2, 70, 34, 30);

	noLoop();
};


Game.prototype.reset = function() {
	this.tRex = new Dinosaure();
	this.horizon = new Horizon();
	this.obstacles = [];
	this.clouds = [];
	this.score = 0;
};


Game.prototype.start = function() {
	this.status = Game.status.RUNNING;
	loop();
};


Game.prototype.update = function() {

	this.score++;

	if(frameCount % 80 == 0) { //toutes les X frames
		this.obstacles.push(new Obstacle());
	}

	if(frameCount % 250 == 0) {
		this.clouds.push(new Cloud());
	}

	for (var i = this.obstacles.length - 1; i > 0; i--) {
		this.obstacles[i].update();

		if(this.obstacles[i].hits(this.tRex)) { //ca devrait etre dans Dinosaure.js plutot
			this.status = Game.status.OVER;
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

	var scoreString = this.score + "";
	fill(255);
	text(this.score, width - (scoreString.length * 6) - 15, 20);
};


Game.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    OVER: 'OVER'    
};