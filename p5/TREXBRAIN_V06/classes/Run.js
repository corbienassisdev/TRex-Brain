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

	var genomes = [];
	var brains = [];
	var dinosaures = [];

	//initializes a population of N_MAX genomes
	for(var i=0; i<Manipulator.N_MAX; i++) {
		var perceptron = new synaptic.Architect.Perceptron(4,6,6,2);
		genomes.push(new Genome(perceptron, 0));
	}

	genomes.forEach(function(genome) {
		brains.push(new Brain(genome));
	});

	brains.forEach(function(brain) {
		dinosaures.push(new Dinosaure(brain));
	});

	var game = new Game();
	game.initialize(dinosaures);
	game.start();
	
	var manip = new Manipulator(game);
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