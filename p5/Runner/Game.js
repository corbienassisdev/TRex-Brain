function Game() {
	this.speed; //en km/h
	this.horizon;
	this.dinosaures;

	this.init = function() {
		this.speed = 6; //en km/h
		this.horizon = new Horizon();
		this.horizon.init();
		this.dinosaures = [];

		//ajout de ma génération
		for(var i = 0; i<1; i++)
		{
			d = new Dinosaure();
			d.init();
			this.dinosaures.push(d);
		}
	}

	this.run = function() {
		this.dinosaures.forEach(function(d) {
			d.run();
		});
	}

	this.display = function() {
		this.horizon.display();
		//elements.display();
		this.dinosaures.forEach(function(d) {
			d.display();
		});
	}
}