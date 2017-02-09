function Jeu() {

	this.gravite; //en m/s
	this.highscore;
	this.partieCourante;
	this.canvas;
	this.canvasCtx;

	this.initialiser = function() {
		console.log("Initialisation Jeu");

		this.partieCourante = new Partie();
		this.gravite = 9.8;
		this.highscore = 0;
		this.canvas = document.querySelector('#canvas');
		this.canvasCtx = this.canvas.getContext('2d');
	}

	this.lancer = function() {
		//ma génération de dinosaures (1 seul pour le moment)
		var dino_1 = new Dinosaure();
	    var dinosaures = [];
	    dinosaures.push(dino_1); //on fera une boucle for ensuite

		this.partieCourante.initialiser(dinosaures);
	}

	this.effacerCanvas = function() {
		this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.width);
	}
}

function Partie() {
	this.vitesse; //en km/h
	this.dinosaures = [];

	this.initialiser = function(dinosaures) {
		console.log("Initialisation Partie");

		this.vitesse = 6; //vitesse de départ
		this.dinosaures = dinosaures;

		dinosaures.forEach(function(dino) {
			dino.initialiser();
		});
	}

	this.lancer = function() {
		
	}

	this.rafraichir = function() {
		
	}
}

function Dinosaure() {
	this.position;
	this.etat;
	this.sprite;

	this.initialiser = function() {
		console.log("Initialisation Dinosaure");

		this.sprite = new Image();
		this.sprite.src = 'sprites/trex_stand.png';
	}

	this.sauter = function() {

	}

	this.seBaisser = function() {

	}
}

function Obstacle() {
	this.type; //soit terrestre soit aérien
	this.dimensions;
	this.position;
}

var mon_image = new Image();
mon_image.src = "sprites/trex_stand.png";

// Main
window.onload = function() {
    var canvas = document.getElementById('canvas');
    console.log(canvas);

	var context = canvas.getContext('2d');
    console.log(context);

    for(var i=0; i<1000; i++)
    {
    	context.clearRect(0, 0, this.canvas.width, this.canvas.width);
    	context.drawImage(mon_image, i, 80);
    }
	
	console.log(mon_image);
};
