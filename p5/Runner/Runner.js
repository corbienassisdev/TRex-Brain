function Runner() {

	this.gravity; //en m/s
	this.highscore;
	this.currentGame;

	this.init = function() {
		this.gravity = 9.8; //en m/s
		this.highscore = 0;
		this.currentGame = new Game();
		this.currentGame.init();
	}

	this.run = function() {

	}

	this.display = function () {
		this.currentGame.display();
		console.log("affichage");
	}
}