Manipulator.MUTATION_RATE = 0.2;
Manipulator.N_MAX = 10; //nombre de génomes par génération
Manipulator.N_PARENTS = 2;

function Manipulator(game) {

	this.game = game;
	this.status = Manipulator.status.FITNESS;

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];
}

Manipulator.prototype.initialize = function() {

	var brains = [];
	var dinosaures = [];

	//initializes a population of N_MAX genomes
	for(var i=0; i<Manipulator.N_MAX; i++) {
		var perceptron = new synaptic.Architect.Perceptron(4,6,6,2);
		this.genomes.push(new Genome(perceptron, 0));
	}

	this.genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});

	this.game.initialize(dinosaures);
	this.game.start();
};


Manipulator.prototype.calcFitness = function() {

	var brains = [];
	var dinosaures = [];

	if (this.matingPool.length > 0) {
		this.genomes = [];
		for(var i=0; i<this.matingPool.length; i++) {
			this.genomes.push(this.matingPool[i]);
		}
		console.log(this.matingPool);
	}

	//this.genomes contient les genomes selectionnés, croisés et mutés
	this.genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});

	this.game.reset(dinosaures); //la fitness de chaque génome s'incrémente au fur et à mesure des cactus sautés.
};


Manipulator.prototype.selectParents = function() {

	//on trie nos génomes par ordre décroissant des fitness.
	this.genomes.sort(function(g1, g2) {
	    f1 = g1.fitness;
	    f2 = g2.fitness;
	    return f1>f2 ? -1 : f1<f2 ? 1:0;
	});

	//on insère les 2 meilleurs génomes dans la mating pool
	this.matingPool = [];
	for(var i=0; i<Manipulator.N_PARENTS; i++)
		this.matingPool.push(this.genomes[i]);
};

Manipulator.prototype.crossovers = function() {
	//récupération des deux meilleurs génomes (élitisme)
	var genA = this.matingPool[0];
	var genB = this.matingPool[1];

	//ajout de nouveaux génomes par crossing-over des deux meilleurs de la génération d'avant
	for(var i=0; i<Manipulator.N_MAX - Manipulator.N_PARENTS; i++) {
		var newPerceptron = Genome.crossover(genA.perceptron, genB.perceptron)
		var newGenome = new Genome(newPerceptron, 0);
		this.matingPool.push(newGenome);
	}
};

Manipulator.prototype.mutations = function() {

	var exported = this.matingPool[0].perceptron.toJSON();

	//mutation de 11 génomes sur 12
	//on garde le 12ème qui est un clone d'élite de la génération,
	//afin d'éviter de trop régresser
	for(var i=1; i<this.matingPool.length-1; i++) {
		var tmp = Genome.mutate(this.matingPool[i].perceptron.toJSON());
		this.matingPool[i].perceptron = synaptic.Network.fromJSON(tmp);
	}
};

Manipulator.prototype.wait = function() {
	var game = this.game;
	var manip = this;
	setInterval(function() { //check toutes les demi-secondes si la game en cours est finie. Si oui, effectue l'algo génétique
		if((game.status == Game.status.OVER) && (manip.status == Manipulator.status.FITNESS))
		{
			manip.selectParents();
			manip.crossovers();
			manip.mutations();
			manip.calcFitness();
		}
	}, 500);
};

Manipulator.status = {
	INITIALIZE: 'INITIALIZING GENOMES',
	FITNESS: 'CALCULING FITNESS',
	SELECTION: 'SELECTING BEST GENOMES',
	CROSSOVER: 'CROSSING OVER ON BEST GENOMES',
	MUTATION: 'MUTATING NEW GENOMES'
};