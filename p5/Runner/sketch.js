"use strict";

var game; //partie courante

function setup() {
	createCanvas(600,150);
	game = new Game();
}

function draw() {
	game.update();
	game.show();
}