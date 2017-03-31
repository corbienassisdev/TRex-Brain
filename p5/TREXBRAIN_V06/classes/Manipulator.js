Manipulator.MUTATION_RATE = 0.01;
Manipulator.N_MAX = 1; //number of genomes per generation

function Manipulator(game) {

	this.game = game;
	this.status = Manipulator.status.INITIALIZE;

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];
}

Manipulator.prototype.start = function() {
	var brains = [];
	var dinosaures = [];

	this.genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});
	
	//fill fitness for each genome
	var game = new Game(dinosaures);
	game.start(this);
};

Manipulator.prototype.select = function() {
	this.calcFitness();
	this.selectParents();
};

Manipulator.prototype.reproduce = function() {
	this.crossover();
	this.mutate();
};

Manipulator.prototype.initialize = function() {

	//initializes a population of N_MAX genomes
	for(var i=0; i<Manipulator.N_MAX; i++) {
		var perceptron = new synaptic.Architect.Perceptron(4,6,6,2);
		this.genomes.push(new Genome(perceptron, 0));
	}
};

Manipulator.prototype.calcFitness = function() {
	console.log('calcFitness');
};

Manipulator.prototype.selectParents = function() {
	console.log('selectParents');
};

Manipulator.prototype.crossover = function() {
	console.log('crossover');
};

Manipulator.prototype.mutate = function() {
	console.log('mutate');
};

Manipulator.prototype.wait = function() {
	var game = this.game;
	var manip = this;
	setInterval(function() {
		if((game.status === Game.status.OVER) && (manip.status === Manipulator.status.FITNESS))
			{manip.selectParents();
			manip.crossover();
			manip.mutate();
			manip.calcFitness();}
	}, 500);
};

Manipulator.status = {
	INITIALIZE: 'INITIALIZING GENOMES',
	FITNESS: 'CALCULING FITNESS',
	SELECTION: 'SELECTING BEST GENOMES',
	CROSSOVER: 'CROSSING OVER ON BEST GENOMES',
	MUTATION: 'MUTATING NEW GENOMES'
};