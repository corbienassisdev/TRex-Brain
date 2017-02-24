"use strict";

var network;

function setup() {
	createCanvas(640, 360);
	network = new Network();

	var a = new Neuron(-200, 0);
	var b = new Neuron(0, 100);
	var c = new Neuron(0, -100);
	var d = new Neuron(200, 0);

	network.addNeuron(a);
	network.addNeuron(b);
	network.addNeuron(c);
	network.addNeuron(d);
}


function draw() {
	background(255);
	network.display();
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