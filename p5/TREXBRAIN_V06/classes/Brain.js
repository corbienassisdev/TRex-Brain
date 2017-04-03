function Brain(genome) {

	this.genome = genome;
	this.host; //reference to the possessor of the brain (for inputs)
}

Brain.prototype.initialize = function (dinosaure) {

	this.host = dinosaure;
	this.genome.fitness = 0;
};

Brain.prototype.update = function() {
	
	var inputs = this.getInputs();
	var outputs = this.genome.perceptron.activate(inputs);

	//bloc de test : le tRex réagit comme il faut !
	/*if (50 < this.tRex.game.score && this.tRex.game.score < 100) {
		outputs[0] = 0.7;
		outputs[1] = 0.3;
	} else if (100 < this.tRex.game.score && this.tRex.game.score < 150) {
		outputs[0] = 0.3;
		outputs[1] = 0.7;
	} else if (150 < this.tRex.game.score && this.tRex.game.score < 200) {
		outputs[0] = 0.7;
		outputs[1] = 0.7;
	}*/

	//console.log(outputs);
	
	if(outputs[0] >= 0.5)
		this.host.jump();
	if(outputs[1] >= 0.5)
		this.host.duck();
};

Brain.prototype.getInputs = function() {
	
	var inputs = [];

	var obstaclesToReach = [];
	var nearObstacle;

	for(var i = 0; i<this.host.game.obstacles.length; i++) {
		if (this.host.game.obstacles[i].x >= this.host.x) {
			obstaclesToReach.push(this.host.game.obstacles[i]);
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
		var speed = map(this.host.game.speed, 0, 15, 0, 1); //speed (0 to 1)
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

