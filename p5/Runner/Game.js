function Game(sprites, sounds, font) {
	
	this.sprites = sprites;
	this.sounds = sounds;
	this.font = font;

	this.speed = 6;
	this.tRex = new Dinosaure(sprites, this);
	this.horizon = new Horizon(sprites);
	this.obstacles = [];
	this.clouds = [];
	this.score = 0;
	this.highscore = 0;
	this.status = Game.status.WAITING;

	this.nextObstacleFrameCount = floor(random(45, 130));
	this.nextCloudFrameCount = floor(random(100, 800));
}


Game.prototype.wait = function() {
	this.horizon.show();
	this.tRex.show();

	this.showScore();

	noLoop();
};


Game.prototype.over = function() {
	image(this.sprites['over.text'], 205, 42);
	image(this.sprites['over.replay'], 282, 75);
	
	this.showScore();

	noLoop();
};


Game.prototype.reset = function() {
	this.tRex = new Dinosaure(this.sprites, this);
	this.horizon = new Horizon(this.sprites);
	this.obstacles = [];
	this.score = 0;
	this.speed = 6;
};


Game.prototype.start = function() {
	this.status = Game.status.RUNNING;
	this.tRex.status = Dinosaure.status.RUNNING;
	loop();
};


Game.prototype.update = function() {
	
	if(frameCount % 8 == 0)
		this.score++;

	if(this.nextObstacleFrameCount == frameCount) {
		this.lastObstacleFrameCount = frameCount;
		this.nextObstacleFrameCount = this.lastObstacleFrameCount + floor(random(45, 130));
		this.obstacles.push(new Obstacle(this.sprites, this.score));
	}

	if(this.nextCloudFrameCount == frameCount) {
		this.lastCloudFrameCount = frameCount;
		this.nextCloudFrameCount = this.lastCloudFrameCount + floor(random(100, 800));
		this.clouds.push(new Cloud(this.sprites));
	}

	this.horizon.update(this.speed);

	for (var i = this.obstacles.length - 1; i > 0; i--) {
		this.obstacles[i].update(this.speed);

		if(this.obstacles[i].hits(this.tRex)) { //ca devrait etre dans Dinosaure.js plutôt
			this.end();
		}

		if(this.obstacles[i].x < - this.obstacles[i].width) {
			this.obstacles.splice(i, 1);
			this.speed = this.speed * 1.01; //on augmente la vitesse
		}
	}

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].update(this.speed);

		if(this.clouds[i].x < - this.clouds[i].width) {
			this.clouds.splice(i, 1);
		}
	}

	this.tRex.update(this.sounds);
};


Game.prototype.show = function() {

	clear();

	this.horizon.show();

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].show();
	}

	for (var i = this.obstacles.length -1; i > 0; i--) {
		this.obstacles[i].show();
	}

	this.tRex.show();

	this.showScore();
};


Game.prototype.showScore = function() {

	textFont(this.font);
	textSize(11);
	noSmooth();
	fill(65);
	var str = this.score + "";
	var StrScore = "";

	if(this.score % 50 == 0 && this.score != 0)
		if(!this.sounds['checkpoint'].isPlaying())
			this.sounds['checkpoint'].play();

	for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.score;

	text(StrScore, width - 65, 20);

	if(this.highscore != 0) {

		fill(100);
		str = this.highscore + "";
		StrScore = "HI ";
		for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.highscore;

		text(StrScore, width - 162, 20);
	}
	noFill();
};


Game.prototype.end = function() {

	this.status = Game.status.OVER;
	this.tRex.status = Dinosaure.status.CRASHED; //on affiche le tRex crashé
	this.sounds['die'].play();
	this.tRex.show();
	
	if(this.score > this.highscore)
		this.highscore = this.score;
};


Game.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    OVER: 'OVER'    
};