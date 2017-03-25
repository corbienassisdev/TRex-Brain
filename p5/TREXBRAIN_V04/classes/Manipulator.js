Manipulator.MUTATION_RATE = 0.01;
Manipulator.N_MAX = 1; //number of genomes per generation

function Manipulator() {

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];
}

Manipulator.prototype.run = function() {

	this.calcFitness();
};

Manipulator.prototype.initialize = function() {

	//initializes a population of N_MAX genomes
	for(var i=0; i<Manipulator.N_MAX; i++) {
		var perceptron = new synaptic.Architect.Perceptron(4,6,6,2);
		this.genomes.push(new Genome(perceptron, 0));
	}
};

Manipulator.prototype.calcFitness = function() {
	
	var brains = [];
	var dinosaures = [];

	this.genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});
	
	var game = new Game(dinosaures);
	game.instance(this); //fill fitness for each genome
};

Manipulator.prototype.selectParents = function() {
	console.log('coucoucoucou');
	this.crossover();
};

Manipulator.prototype.crossover = function() {
	this.mutate();
};

Manipulator.prototype.mutate = function() {
	this.calcFitness();
};