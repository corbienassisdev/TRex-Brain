function Genome(perceptron, fitness) {
	
	this.perceptron = perceptron;
	this.fitness = fitness;
}

Genome.crossover = function(genA, genB) {

	// Swap (50% prob.)
	if (Math.random() > 0.5) {
		var tmp = genA;
		genA = genB;
		genB = tmp;
	}

	// Clone network
	genA = _.cloneDeep(genA);
	genB = _.cloneDeep(genB);

	// Cross over data keys
	Genome.crossOverDataKey(genA.neurons, genB.neurons, 'bias');

	return genA;
};

Genome.crossOverDataKey = function (a, b, key) {
	var cutLocation = Math.round(a.length * Math.random());

	var tmp;
	for (var k = cutLocation; k < a.length; k++) {
		// Swap
		tmp = a[k][key];
		a[k][key] = b[k][key];
		b[k][key] = tmp;
	}
}

// Does random mutations across all
// the biases and weights of the Networks
// (This must be done in the JSON to
// prevent modifying the current one)
Genome.mutate = function (net){
	
	Genome.mutateDataKeys(net.neurons, 'bias', Manipulator.MUTATION_RATE);
	Genome.mutateDataKeys(net.connections, 'weight', Manipulator.MUTATION_RATE);

	return net;
}

Genome.mutateDataKeys = function (a, key, mutationRate){
	for (var k = 0; k < a.length; k++) {
		// Should mutate?
		if (Math.random() > mutationRate) {
			continue;
		}
		a[k][key] += a[k][key] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
	}
}

/*
Travail demandé en stage (1 à 2p)

1. Repérer une situiation de KK ou bien dans laquelle une meilleure identification du KK aurait été b&énificiarie

	- identifier une situation

2. Proposer une démarche (outils/méthode) facilitatrice de KX (tant en FH qu'en TIC)

	- expliciter une démarche

3. Comment cette démarche (outil/méthode) se mettrait en marche (données d'entrée, calcul ou process, retour sur l'activité).

4. "Teach me this" proposé

	- Face à ça, on dit : j'aurais bien aimé avoir plus d'information sur tel truc
	- limite, conclusion : je ne peux pas y arriver parce qu'il me manque ça
*/