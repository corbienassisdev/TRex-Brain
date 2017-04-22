Manipulator.MUTATION_RATE = 0.2;
Manipulator.N_MAX = 40 //nombre de génomes par génération
Manipulator.N_PARENTS = 2;


function Manipulator(game, ui) {

	this.game = game;
	this.ui = ui;

	this.nbGenerations = 0;

	this.genomes = [];
	this.matingPool = [];
}


Manipulator.prototype.initialize = function() {

	this.ui.log('INITIALIZING');
	this.ui.createData();
	this.ui.updateData('GENERATION NUMBER', this.nbGenerations);
	this.ui.updateData('GENOMES PER GENERATION', Manipulator.N_MAX);
	this.ui.updateData('MUTATION RATE', Manipulator.MUTATION_RATE);
	this.ui.updateData('MUTATION RATE', Manipulator.MUTATION_RATE);
	this.ui.updateData('ELITE CLONES', Manipulator.N_PARENTS);
	this.ui.createInputs();

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

	this.game.interface(this.ui);

	this.game.initialize(dinosaures);
	this.game.start();
};


Manipulator.prototype.calcFitness = function() {

	this.ui.log('CALCULING FITNESSES');

	var brains = [];
	var dinosaures = [];

	if (this.matingPool.length > 0) {
		this.genomes = [];
		for(var i=0; i<this.matingPool.length; i++) {
			this.genomes.push(this.matingPool[i]);
		}
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

	this.ui.log('SELECTING BEST GENOMES');

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

	this.ui.log('CROSSING OVER ON BEST GENOMES');

	//récupération des deux meilleurs génomes (élitisme)
	var genA = this.matingPool[0];
	var genB = this.matingPool[1];

	//ajout de nouveaux génomes par crossing-over des deux meilleurs de la génération d'avant
	for(var i = 0; i < Manipulator.N_MAX - Manipulator.N_PARENTS; i++) {

		var newPerceptron = Genome.crossover(genA.perceptron, genB.perceptron)
		var newGenome = new Genome(newPerceptron, 0);
		this.matingPool.push(newGenome);
	}
};


Manipulator.prototype.mutations = function() {

	this.ui.log('MUTATING NEW GENOMES');

	for(var i = Manipulator.N_PARENTS; i < this.matingPool.length - Manipulator.N_PARENTS; i++) {

		var tmp = Genome.mutate(this.matingPool[i].perceptron.toJSON()); //on passe par JSON pour retoucher facilement aux neurones et aux connections
		this.matingPool[i].perceptron = synaptic.Network.fromJSON(tmp);
	}
};


Manipulator.prototype.wait = function() {

	var game = this.game;
	var manip = this;
	setInterval(function() { //check toutes les demi-secondes si la partie en cours est finie. Si oui, effectue l'algo génétique
		if((game.status == Game.status.OVER))
		{
			var avgFitness = manip.averageFitness();
			var topFitness = manip.topFitness();
			manip.selectParents();
			manip.crossovers();
			manip.mutations();
			manip.calcFitness(); //change game status
			manip.nbGenerations++;
			manip.ui.updateData('GENERATION NUMBER', manip.nbGenerations);
			manip.ui.updateData('TOP FITNESS', topFitness);
			manip.ui.updateData('AVERAGE FITNESS', avgFitness);
			manip.ui.updateChart(manip.nbGenerations, avgFitness, topFitness);
		}
	}, 500);
};


Manipulator.prototype.averageFitness = function() {
	
	var sum = 0;
	this.genomes.forEach(function(g) {
		sum += g.fitness;
	});

	var total = this.genomes.length;

	return sum/total;
};


Manipulator.prototype.topFitness = function() {
	
	var top = 0;
	this.genomes.forEach(function(g) {
		if(g.fitness > top)
			top = g.fitness;
	});
	
	return top;
};