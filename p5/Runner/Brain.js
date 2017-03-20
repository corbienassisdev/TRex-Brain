function Brain(tRex) {
	
	this.network = new synaptic.Architect.Perceptron(4,6,6,2);
	this.tRex = tRex; //reference au tRex lui même linké à la game (pour les inputs)

	this.duck = false;

	//initialisation au milieu (0,5)
}

Brain.prototype.update = function() {
	
	var inputs = this.getInputs();
	var outputs = this.network.activate(inputs);

	//bloc de test : le tRex réagit comme il faut !
	/*if (50 < this.tRex.game.score && this.tRex.game.score < 100) {
		outputs[0] = 0.7;
		outputs[1] = 0.3;
	} else if (100 < this.tRex.game.score && this.tRex.game.score < 150) {
		outputs[0] = 0.3;
		outputs[1] = 0.7;
	}*/

	console.log(outputs);
	
	if(outputs[0] >= 0.5)
		this.tRex.jump();
	if(outputs[1] >= 0.5)
		this.duck = true;
};

Brain.prototype.getInputs = function() {
	
	var inputs = [];

	var obstaclesToReach = [];
	var nearObstacle;

	for(var i = 0; i<this.tRex.game.obstacles.length; i++) {
		if (this.tRex.game.obstacles[i].x >= this.tRex.x) {
			obstaclesToReach.push(this.tRex.game.obstacles[i]);
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
		var speed = map(this.tRex.game.speed, 0, 15, 0, 1); //speed (0 to 1)
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
