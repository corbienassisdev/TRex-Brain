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
};

Manipulator.prototype.selectParents = function() {

};

Manipulator.prototype.crossover = function() {
	
};

Manipulator.prototype.mutate = function() {

};
