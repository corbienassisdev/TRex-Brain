function Jeu() {

	this.gravite;
	this.highscore;
	this.compteurParties;
	this.partieCourante;

	this.initialiser = function() {

	}
}

function Partie() {
	this.vitesse;
	this.dinosaures;

	this.initialiser = function() {

	}

	this.lancer = function() {
		return 'ca commence bien';
	}

	this.rafraichir = function() {

	}
}

function Dinosaure() {
	this.position;

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

var partie = new Partie();

console.log(partie.lancer());