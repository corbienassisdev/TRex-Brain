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
	var inputs = this.getInputs();
	
	//reprendre ici

	console.log(inputs);
};

Brain.prototype.getInputs = function() {
	
	var inputs = [];

	var obstaclesToReach = [];
	var nearObstacle;

	for(var i = 0; i<this.game.obstacles.length; i++) {
		if (this.game.obstacles[i].x >= this.game.tRex.x) {
			obstaclesToReach.push(this.game.obstacles[i]);
		}
	}

    if (obstaclesToReach.length > 0) {
		nearObstacle = obstaclesToReach[0];
		for(var i = 0; i<obstaclesToReach.length; i++) {
			if (obstaclesToReach[i].x < nearObstacle.x)
				nearObstacle = obstaclesToReach[i];
		}
	}

	if(nearObstacle != null) {
		inputs['speed'] = this.game.speed;
		inputs['distance'] = nearObstacle.x;
		inputs['width'] = nearObstacle.width;
		inputs['type'] = nearObstacle.type;
	}

	return inputs;
};
