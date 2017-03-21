function Game(dinosaures) {

	this.sprites = new Object();
	this.sounds = new Object();
	this.font;

	var game = this;
	var sketch = function(p5) {

		p5.preload = function() {
			game.sprites['horizon'] = p5.loadImage('resources/sprites/horizon.png');
			game.sprites['cloud'] = p5.loadImage('resources/sprites/cloud.png');

			game.sprites['trex.stand'] = p5.loadImage('resources/sprites/trex_stand.png');
			game.sprites['trex.run.1'] = p5.loadImage('resources/sprites/trex_run_1.png');
			game.sprites['trex.run.2'] = p5.loadImage('resources/sprites/trex_run_2.png');
			game.sprites['trex.duck.1'] = p5.loadImage('resources/sprites/trex_duck_1.png');
			game.sprites['trex.duck.2'] = p5.loadImage('resources/sprites/trex_duck_2.png');
			game.sprites['trex.crashed'] = p5.loadImage('resources/sprites/trex_crashed.png');

			game.sprites['pterodactyl.fly.1'] = p5.loadImage('resources/sprites/pterodactyl_fly_1.png');
			game.sprites['pterodactyl.fly.2'] = p5.loadImage('resources/sprites/pterodactyl_fly_2.png');

			game.sprites['cactus.1'] = p5.loadImage('resources/sprites/cactus_big.png');
			game.sprites['cactus.2'] = p5.loadImage('resources/sprites/cactus_big_bunch_2.png');
			game.sprites['cactus.3'] = p5.loadImage('resources/sprites/cactus_bunch_4.png');
			game.sprites['cactus.4'] = p5.loadImage('resources/sprites/cactus_small.png');
			game.sprites['cactus.5'] = p5.loadImage('resources/sprites/cactus_small_bunch_2.png');
			game.sprites['cactus.6'] = p5.loadImage('resources/sprites/cactus_small_bunch_3.png');

			game.sprites['over.replay'] = p5.loadImage('resources/sprites/bouton_replay.png');
			game.sprites['over.text'] = p5.loadImage('resources/sprites/game_over.png');

			game.sounds['checkpoint'] = p5.loadSound('resources/sounds/checkPoint.mp3');
			game.sounds['jump'] = p5.loadSound('resources/sounds/jump.mp3');
			game.sounds['die'] = p5.loadSound('resources/sounds/die.mp3');

			game.font = p5.loadFont('resources/fonts/PressStart2P.ttf');
		};

		p5.setup = function() {
			p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
			game.initialize(dinosaures);
		};

		p5.draw = function() {
			switch(game.status) {
				case Game.status.WAITING:
					game.wait();
					break;
				case Game.status.RUNNING:
					game.update();
					game.show();
					break;
				case Game.status.OVER:
					game.over();
			}
		};

		p5.keyPressed = function() {

			switch(game.status) {

				case Game.status.WAITING:
					if(p5.keyCode == p5.UP_ARROW || p5.keyCode == 32)
						game.start();
					break;
				case Game.status.OVER:
					if(p5.keyCode == p5.UP_ARROW || p5.keyCode == 32 || mouseIsPressed) {
						game.reset();
						game.start();
					}	
			}
		}


		p5.mousePressed = function() {
			if(game.status == Game.status.OVER) {
				game.reset();
				game.start();
			}
		}
	};

	this.p5 = new p5(sketch);

	this.status;
	this.speed;
	this.horizon;
	this.obstacles;
	this.clouds;
	this.dinosaures;
	this.score;
	this.highscore;
	this.status;

	this.nextObsFC; //next Obstacle FrameCount
	this.nextCloudFC; //next Cloud FrameCount
}

Game.prototype.initialize = function(dinosaures) {

	this.status = Game.status.WAITING;

	this.horizon = new Horizon(this);
	this.obstacles = [];
	this.clouds = [];
	this.dinosaures = dinosaures;

	var game = this;
	this.dinosaures.forEach(function(d) {
		d.initialize(game);
	});

	this.speed = 6;
	this.score = 0;
	this.highscore = 0;

	this.lastObsFC = this.p5.frameCount;
	this.lastCloudFC = this.p5.frameCount;

	this.nextObsFC = this.lastObsFC + this.p5.floor(this.p5.random(45, 130));//next Obstacle FrameCount
	this.nextCloudFC = this.lastCloudFC + this.p5.floor(this.p5.random(100, 800)); //next Cloud FrameCount

	this.obstacles.push(new Obstacle(this));
};


Game.prototype.start = function() {

	this.status = Game.status.RUNNING;

	this.dinosaures.forEach(function(d) {
		d.status = Dinosaure.status.RUNNING;
	});

	this.p5.loop();
};


Game.prototype.update = function() {
	
	if(this.p5.frameCount % 8 == 0)
		this.score++;

	if(this.nextObsFC == this.p5.frameCount) {
		this.lastObsFC = this.p5.frameCount;
		this.nextObsFC = this.lastObsFC + this.p5.floor(this.p5.random(45, 130));
		this.obstacles.push(new Obstacle(this));
	}

	if(this.nextCloudFC == this.p5.frameCount) {
		this.lastCloudFC = this.p5.frameCount;
		this.nextCloudFC = this.lastCloudFC + this.p5.floor(this.p5.random(100, 800));
		this.clouds.push(new Cloud(this));
	}

	this.horizon.update(this.speed);

	for (var i = this.obstacles.length - 1; i > 0; i--) {
		this.obstacles[i].update(this.speed);

		for (var j = this.dinosaures.length - 1; j >= 0; j--) {
			if(this.dinosaures[j].hits(this.obstacles[i]))
				this.dinosaures.splice(j, 1);
		}

		if(this.dinosaures.length == 0)
			this.end();

		if(this.obstacles[i].x < -this.obstacles[i].width) {
			this.obstacles.splice(i, 1);
			this.speed = this.speed * 1.01; //on augmente la vitesse
			
			this.dinosaures.forEach(function(d) {
				d.fitness++;
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

	this.p5.noLoop();
};


Game.prototype.show = function() {

	this.p5.clear();

	this.horizon.show();

	for (var i = this.clouds.length -1; i > 0; i--) {
		this.clouds[i].show();
	}

	for (var i = this.obstacles.length -1; i > 0; i--) {
		this.obstacles[i].show();
	}

	//this.tRex.show();
	this.dinosaures.forEach(function(d) {
		d.show();
	});

	this.showScore();
};


Game.prototype.showScore = function() {

	this.p5.textFont(this.font);
	this.p5.textSize(11);
	this.p5.noSmooth();
	this.p5.fill(65);
	var str = this.score + "";
	var StrScore = "";

	if(this.score % 100 == 0 && this.score != 0)
		if(!this.sounds['checkpoint'].isPlaying())
			this.sounds['checkpoint'].play();

	for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.score;

	this.p5.text(StrScore, this.p5.canvas.width - 65, 20);

	if(this.highscore != 0) {

		this.p5.fill(100);
		str = this.highscore + "";
		StrScore = "HI ";
		for (var i=0; i<5-str.length; i++) { StrScore += "0"; }	StrScore += this.highscore;

		this.p5.text(StrScore, this.p5.canvas.width - 162, 20);
	}
	this.p5.noFill();
};


Game.prototype.end = function() {

	this.status = Game.status.OVER;
	this.sounds['die'].play();
	
	if(this.score > this.highscore)
		this.highscore = this.score;
};


Game.prototype.over = function() {

	this.p5.image(this.sprites['over.text'], 205, 42);
	this.p5.image(this.sprites['over.replay'], 282, 75);
	
	this.showScore();

	this.p5.noLoop();
};


Game.prototype.reset = function() {
	
	this.dinosaures.forEach(function(d) {
		d.pop();
	});

	for (var i = 0; i < 12; i++) {
		this.dinosaures.push(new Dinosaure(new Brain(new synaptic.Architect.Perceptron(4,6,6,2))));
	}
	this.initialize(this.dinosaures);
};


Game.status = {
	WAITING: 'WAITING',
	RUNNING: 'RUNNING',
    OVER: 'OVER'    
};