"use strict";

var game; //partie courante

function setup() {

	createCanvas(600,150);
	game = new Game();
}


function draw() {
	
	switch(game.status) {
		case Game.status.WAITING:
			game.wait();
			break;
		case Game.status.RUNNING:
			game.update();
			game.show();
			break;
		case Game.status.OVER:
			game.over();
	}
}


function keyPressed() {

	switch(game.status) {

		case Game.status.WAITING:
			if(keyCode == UP_ARROW || keyCode == 32)
				game.start();
			break;
		case Game.status.OVER:
			if(keyCode == UP_ARROW || keyCode == 32 || mouseIsPressed) {
				game.reset();
				game.start();
			}	
	}
}


function mousePressed() {

	if(game.status == Game.status.OVER) {
		game.reset();
		game.start();
	}
}