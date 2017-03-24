function Manipulator() {
	
	this.MUTATION_RATE = 0.01;
	this.N_MAX = 12; //number of genomes per generation

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];
}

Manipulator.prototype.run = function() {
	while(true) {
		this.select();
		this.reproduce();
	}
};

Manipulator.prototype.initialize = function() {

	//initializes a population of N_MAX genomes
	for(var i=0; i<this.N_MAX; i++)
		this.genomes.push(new synaptic.Architect.Perceptron(4,6,6,2));
};

Manipulator.prototype.select = function() {
	this.calcFitness();
	this.selectParents();
};

Manipulator.prototype.reproduce = function() {
	this.crossover();
	this.mutate();
};


Manipulator.prototype.calcFitness = function() {
	//à partir de mes génomes, je crée les cerveaux des dinosaures, puis les dinosaures
	//je lance un partie avec mes dinosaures
	//je récupère la fitness pour chaque génome
	var brains = [];
	var dinosaures = [];

	this.genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});

	var game = new Game(dinosaures);
	var fitnesses = [];

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
			game.start();
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
					break;
			}
		};

		p5.keyPressed = function() {

			switch(game.status) {

				case Game.status.WAITING:
					if(p5.keyCode == p5.UP_ARROW || p5.keyCode == 32)
						game.start();
					break;
				case Game.status.OVER:
					if(p5.keyCode == p5.UP_ARROW || p5.keyCode == 32 || p5.mouseIsPressed) {
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

	game.p5 = new p5(sketch);

	//game.initialize(dinosaures);
	//var fitnesses = game.run(dinosaures);
};

Manipulator.prototype.selectParents = function() {

};

Manipulator.prototype.crossover = function() {
	
};

Manipulator.prototype.mutate = function() {

};