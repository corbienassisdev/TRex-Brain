"use strict";

var game; //partie courante
var sprites = new Object();
var font;


function preload() {

	sprites['horizon'] = loadImage('sprites/horizon.png');
	sprites['cloud'] = loadImage('sprites/cloud.png');

	sprites['trex.stand'] = loadImage('sprites/trex_stand.png');
	sprites['trex.run.1'] = loadImage('sprites/trex_run_1.png');
	sprites['trex.run.2'] = loadImage('sprites/trex_run_2.png');
	sprites['trex.duck.1'] = loadImage('sprites/trex_duck_1.png');
	sprites['trex.duck.2'] = loadImage('sprites/trex_duck_2.png');
	sprites['trex.crashed'] = loadImage('sprites/trex_crashed.png');

	sprites['pterodactyl.fly.1'] = loadImage('sprites/pterodactyl_fly_1.png');
	sprites['pterodactyl.fly.2'] = loadImage('sprites/pterodactyl_fly_2.png');

	sprites['cactus.1'] = loadImage('sprites/cactus_big.png');
	sprites['cactus.2'] = loadImage('sprites/cactus_big_bunch_2.png');
	sprites['cactus.3'] = loadImage('sprites/cactus_bunch_4.png');
	sprites['cactus.4'] = loadImage('sprites/cactus_small.png');
	sprites['cactus.5'] = loadImage('sprites/cactus_small_bunch_2.png');
	sprites['cactus.6'] = loadImage('sprites/cactus_small_bunch_3.png');

	sprites['over.replay'] = loadImage('sprites/bouton_replay.png');
	sprites['over.text'] = loadImage('sprites/game_over.png');

	font = loadFont('resources/PressStart2P.ttf');
} 


function setup() {
	
	createCanvas(600,150);
	game = new Game(sprites, font);
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