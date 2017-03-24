function Manipulator() {
	
	this.MUTATION_RATE = 0.01;
	this.N_MAX = 12; //number of genomes per generation

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];

	this.game = new Game(); //current game
}

Manipulator.prototype.initialization = function() {

	//initializes a population of N_MAX genomes
	for(var i=0; i<this.N_MAX; i++)
		this.genomes.push(new synaptic.Architect.Perceptron(4,6,6,2));
};

Manipulator.prototype.selection = function() {

	this.calcFitness();
	this.selectParents();
};

Manipulator.prototype.reproduction = function() {

	/*this.crossover();
	this.mutate();*/
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

	this.game.add(dinosaures);
	var fitnesses = game.run();
	console.log('CaclFitness');
};

Manipulator.prototype.selectParents = function() {

};

Manipulator.prototype.crossover = function() {
	
};

Manipulator.prototype.mutate = function() {

};

Manipulator.status = {
	INITIALIZATION: 'INITIALIZATION',
	SELECTION: 'SELECTION',
    REPRODUCTION: 'REPRODUCTION'   
};