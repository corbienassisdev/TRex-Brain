"use strict";

var tRex;
var obstacles = [];

function setup() {
	createCanvas(600,150);
	
	tRex = new Dinosaure();
	obstacles.push(new Obstacle());
}

function draw() {
	background(0);

	stroke(255);
	line(0, 130, width, 130);

	if(frameCount % 80 == 0) //toutes les X frames
	{
		obstacles.push(new Obstacle());
	}

	for (var i = obstacles.length -1; i > 0; i--)
	{
		obstacles[i].update();
		obstacles[i].show();

		if(obstacles[i].hits(tRex)) {
			console.log('HIT');
		}

		if(obstacles[i].x < -20) {
			obstacles.splice(i, 1);
		}
	}

	tRex.update();
	tRex.show();
}

/*function keyPressed()
{
	tRex.jump();
}*/
