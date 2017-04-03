function Game() {

	this.sprites = new Object();
	this.sounds = new Object();

	this.setup();
	
	this.highscore = 0;
	this.status = Game.status.WAITING;
	this.horizon = new Horizon(this);
	this.obstacles = [];
	this.clouds = [];
	this.speed = 6;
	this.score = 0;
	this.lastObsFC = Game.frame;
	this.lastCloudFC = Game.frame;
	this.nextObsFC = this.lastObsFC + floor(random(45, 100)); //next Obstacle FrameCount
	this.nextCloudFC = this.lastCloudFC + floor(random(100, 800)); //next Cloud FrameCount
}

Game.frame = 0;
Game.requestId = 0;

Game.prototype.setup = function() {

	this.loadSprite('horizon', 'horizon.png');
	this.loadSprite('cloud', 'cloud.png');
	this.loadSprite('trex.stand', 'trex_stand.png');
	this.loadSprite('trex.run.1', 'trex_run_1.png');
	this.loadSprite('trex.run.2', 'trex_run_2.png');
	this.loadSprite('trex.duck.1', 'trex_duck_1.png');
	this.loadSprite('trex.duck.2', 'trex_duck_2.png');
	this.loadSprite('trex.crashed', 'trex_crashed.png');
	this.loadSprite('pterodactyl.fly.1', 'pterodactyl_fly_1.png');
	this.loadSprite('pterodactyl.fly.2', 'pterodactyl_fly_2.png');
	this.loadSprite('cactus.1', 'cactus_big.png');
	this.loadSprite('cactus.2', 'cactus_big_bunch_2.png');
	this.loadSprite('cactus.3', 'cactus_bunch_4.png');
	this.loadSprite('cactus.4', 'cactus_small.png');
	this.loadSprite('cactus.5', 'cactus_small_bunch_2.png');
	this.loadSprite('cactus.6', 'cactus_small_bunch_3.png');
	this.loadSprite('over.replay', 'bouton_replay.png');
	this.loadSprite('over.text', 'game_over.png');

	this.sounds['checkpoint'] = new Audio('resources/sounds/checkPoint.mp3');
	this.sounds['jump'] = new Audio('resources/sounds/jump.mp3');
	this.sounds['die'] = new Audio('resources/sounds/die.mp3');
};


Game.prototype.loadSprite = function(name, file) {

	var path = 'resources/sprites/';
	var image = new Image();
	image.src = path + file;
	this.sprites[name] = image;
};


Game.prototype.initialize = function(dinosaures) {

	this.dinosaures = dinosaures;

	var game = this;
	this.dinosaures.forEach(function(d) {
		d.initialize(game);
	});

	this.horizon = new Horizon(this);
	this.obstacles = []; 
	this.clouds = [];
	this.speed = 6;
	this.score = 0;
	this.lastObsFC = Game.frame;
	this.lastCloudFC = Game.frame;
	this.nextObsFC = this.lastObsFC + floor(random(45, 100)); //next Obstacle FrameCount
	this.nextCloudFC = this.lastCloudFC + floor(random(100, 800)); //next Cloud FrameCount
	this.obstacles.push(new Obstacle(this));
};


Game.prototype.loop = function() {
	
	switch(this.status) {
		case Game.status.WAITING:
			this.wait();
			break;
		case Game.status.RUNNING:
			this.update();
			this.show();
			break;
		case Game.status.OVER:
			this.over();
			break;
	}

	if (Game.requestId != undefined) {
		Game.requestId = requestAnimationFrame(this.loop.bind(this));
	}

	Game.frame++;
};


Game.prototype.noRequest = function() {
	
	window.cancelAnimationFrame(Game.requestId);
	Game.requestId = undefined;
};

Game.prototype.request = function() {
	Game.requestId = requestAnimationFrame(this.loop.bind(this));
};


Game.prototype.start = function() {

	this.status = Game.status.RUNNING;

	this.dinosaures.forEach(function(d) {
		d.status = Dinosaure.status.RUNNING;
	});

	this.loop();
};


Game.prototype.update = function() {
	
	if(Game.frame % 8 == 0)
		this.score++;

	if(this.nextObsFC == Game.frame) {
		this.lastObsFC = Game.frame;
		this.nextObsFC = this.lastObsFC + floor(random(45, 100));
		this.obstacles.push(new Obstacle(this));
	}

	if(this.nextCloudFC == Game.frame) {
		this.lastCloudFC = Game.frame;
		this.nextCloudFC = this.lastCloudFC + floor(random(100, 800));
		this.clouds.push(new Cloud(this));
	}

	this.horizon.update(this.speed);

	for (var i = this.obstacles.length - 1; i > 0; i--) {
		this.obstacles[i].update(this.speed);

		for (var j = this.dinosaures.length - 1; j >= 0; j--) {
			//Si un dinosaure touche un cactus
			if(this.dinosaures[j].hits(this.obstacles[i])) {
				this.dinosaures.status = Dinosaure.status.CRASHED;
				this.dinosaures.splice(j, 1);
			}
		}

		if(this.dinosaures.length == 0)
			this.end();

		//L'obstacle sort du canvas à gauche
		if(this.obstacles[i].x < -this.obstacles[i].width) {

			this.obstacles.splice(i, 1);
			this.speed = this.speed * 1.01; //on augmente la vitesse
			
			//si un obstacle sort du canvas et que le dinosaure est vivant, 
			//alors il l'a sauté : on incrémente sa fitness
			this.dinosaures.forEach(function(d) {
				d.brain.genome.fitness++;
			});
		}
	}

	for (var i = this.clouds.length -1; i > 0; i--) {

		this.clouds[i].update(this.speed);

		if(this.clouds[i].x < - this.clouds[i].width)
			this.clouds.splice(i, 1);
	}

	this.dinosaures.forEach(function(d) {
		d.update();
	});
};


Game.prototype.wait = function() {

	this.horizon.show();

	this.dinosaures.forEach(function(d) {
		d.show();
	});

	this.showScore();
};


Game.prototype.show = function() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	this.horizon.show();

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].show();
	}

	for (var i = this.obstacles.length -1; i > 0; i--) {
		this.obstacles[i].show();
	}

	this.dinosaures.forEach(function(d) {
		d.show();
	});

	this.showScore();
};


Game.prototype.showScore = function() {

	context.font = this.font;
	context.fontSize = 'medium';
	context.fillStyle = 'grey';

	var str = this.score + "";
	var StrScore = "";

	if(this.score % 100 == 0 && this.score != 0)
		if(!this.sounds['checkpoint'].paused)
			this.sounds['checkpoint'].play();

	for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.score; //TODO: ctx.measureText('foo'); // TextMetrics object

	context.fillText(StrScore, canvas.width - 65, 20);

	if(this.highscore != 0) {

		fill(100);
		str = this.highscore + "";
		StrScore = "HI ";
		for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.highscore;

		context.fillText(StrScore, canvas.width - 162, 20);
	}
};


Game.prototype.end = function() {

	this.noRequest();

	this.status = Game.status.OVER;
	this.sounds['die'].play();
	
	if(this.score > this.highscore)
		this.highscore = this.score;
};


Game.prototype.over = function() {

	context.drawImage(this.sprites['over.text'], 205, 42);
	context.drawImage(this.sprites['over.replay'], 282, 75);
	
	this.showScore();
};


Game.prototype.reset = function(dinosaures) {
	
	this.initialize(dinosaures);

	this.status = Game.status.RUNNING;

	this.dinosaures.forEach(function(d) {
		d.status = Dinosaure.status.RUNNING;
	});

	this.request();
};


Game.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    OVER: 'OVER'    
};