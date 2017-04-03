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
	organize();
	
	var game = new Game();
	var manip = new Manipulator(game);
	manip.initialize();
	manip.wait();
}


// LAYOUT FITTING //

$(window).resize(function() {
	organize();
});

function organize() {

	var w_width = $(window).width();
	$('#left').width((w_width - CANVAS_WIDTH) / 2);
	$('#right').width((w_width - CANVAS_WIDTH) / 2);
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}