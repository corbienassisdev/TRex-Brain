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
	var outputs = this.network.activate(inputs);

	console.log(outputs);
	//reprendre ici

	//console.log(inputs);
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
		var speed = map(this.game.speed, 0, 15, 0, 1); //speed (0 to 1)
		var distance = map(nearObstacle.x, 0, 500, 0, 1); //distance form next obtstalce (0 to 1)
		var width = map(nearObstacle.width, 0, 73, 0, 1);
		var type = (nearObstacle.type==Obstacle.type.CACTUS)?0:1;

		inputs.push(speed);
		inputs.push(distance);
		inputs.push(width);
		inputs.push(type);
	}

	return inputs;
};
