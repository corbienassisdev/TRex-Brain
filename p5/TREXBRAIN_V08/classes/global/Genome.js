function Genome(perceptron, fitness) {
	
	this.perceptron = perceptron;
	this.fitness = fitness;
}

Genome.crossover = function(genA, genB) {

	if (Math.random() > 0.5) {
		var tmp = genA;
		genA = genB;
		genB = tmp;
	}

	genA = _.cloneDeep(genA);
	genB = _.cloneDeep(genB);

	Genome.crossOverDetail(genA.neurons, genB.neurons, 'bias');

	return genA;
};

Genome.crossOverDetail = function (neuronsA, neuronsB, k) {

	var cut = Math.round(neuronsA.length * Math.random());
	var tmp;
	for (var i=cut; i<neuronsA.length; i++) {
		
		tmp = neuronsA[i][k];
		neuronsA[i][k] = neuronsB[i][k];
		neuronsB[i][k] = tmp;
	}
}

Genome.mutate = function (perceptron){
	
	Genome.mutateDetail(perceptron.neurons, 'bias');
	Genome.mutateDetail(perceptron.connections, 'weight');

	return perceptron;
}

Genome.mutateDetail = function (noc, k){

	for (var i=0; i<noc.length; i++) {
		
		if (Math.random() > Manipulator.MUTATION_RATE) {
			continue;
		}
		noc[i][k] += noc[i][k] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
	}
}

/*

Explication mathématique globale :
https://www.youtube.com/watch?v=bxe2T-V8XRs

*/