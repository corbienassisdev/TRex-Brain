function Jeu() {

	this.gravite; //en m/s
	this.highscore;
	this.partieCourante;
	this.canvas;
	this.canvasCtx;

	this.initialiser = function() {
		this.partieCourante = new Partie();
		this.gravite = 9.8;
		this.highscore = 0;
		this.canvas = document.querySelector('#canvas');
		this.canvasCtx = this.canvas.getContext('2d');

		console.log("Jeu initialisé");
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
		this.vitesse = 6; //vitesse de départ
		this.dinosaures = dinosaures;

		console.log("Partie initialisée");
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

// Main
window.onload = function() {
    var jeu = new Jeu();

    


	jeu.initialiser();
	jeu.lancer();
};
