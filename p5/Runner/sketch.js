"use strict";

var game; //partie courante
var sprites = new Object();


function preload() {

	sprites['cloud'] = loadImage('sprites/cloud.png');
	sprites['trex.dead'] = loadImage('sprites/trex_dead.png');
	sprites['trex.run.1'] = loadImage('sprites/trex_run_1.png');
	sprites['trex.run.2'] = loadImage('sprites/trex_run_2.png');
	sprites['trex.stand'] = loadImage('sprites/trex_stand.png');
	sprites['over.replay'] = loadImage('sprites/bouton_replay.png');
	sprites['over.text'] = loadImage('sprites/game_over.png');
} 


function setup() {

	createCanvas(600,150);
	game = new Game(sprites);
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