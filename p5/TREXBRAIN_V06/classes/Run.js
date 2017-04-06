"use strict";

new p5();

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 150;

var canvas;
var context;

window.onload = function() {

    canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	Interface.organize();

	var ui = new Interface();
	var game = new Game();
	var manip = new Manipulator(game, ui);
	manip.initialize();
	manip.wait();
}


// LAYOUT FITTING //

$(window).resize(function() {
	Interface.organize();
});

/*
    canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	Interface.organize();
	var ui = new Interface();
	ui.createChart();
	
	var game = new Game();
	var manip = new Manipulator(game, ui);
	manip.initialize();
	manip.wait();
*/