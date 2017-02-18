"use strict";

var game; //partie courante
var sprites = new Object();


function preload() {

	sprites['horizon'] = loadImage('sprites/horizon.png');
	sprites['cloud'] = loadImage('sprites/cloud.png');
	sprites['trex.stand'] = loadImage('sprites/trex_stand.png');
	sprites['trex.run.1'] = loadImage('sprites/trex_run_1.png');
	sprites['trex.run.2'] = loadImage('sprites/trex_run_2.png');
	sprites['trex.duck.1'] = loadImage('sprites/trex_duck_1.png');
	sprites['trex.duck.2'] = loadImage('sprites/trex_duck_2.png');
	sprites['trex.crashed'] = loadImage('sprites/trex_crashed.png');
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

	//console.log(game.tRex.status);
	console.log(sprites['trex.stand'].width);
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