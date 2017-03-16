function Brain(game) {
	
	this.network = new synaptic.Architect.Perceptron(4,6,6,2);
	this.game = game; //reference to the game (for inputs)
	
	//console.log(this.game.speed); //input : OK
	
	//console.log(game.obstacles.first.x);
	//input : distance from cactus
	//input : largeur du cactus
	//input : hauteur ? touche le sol ou pas ?

	//

	//initialisation au milieu (0,5)
	
}

Brain.prototype.update = function() {
	console.log(this.game.speed);
};