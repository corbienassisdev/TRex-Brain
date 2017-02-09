"use strict";

var runner;

function setup() {
	createCanvas(600,150);

	runner = new Runner();
	runner.init();

}

function draw() {
	//rect(300,100,100,100);
	runner.currentGame.run();
	runner.currentGame.display();
}


