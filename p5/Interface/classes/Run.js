"use strict";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 150;


var manip;

manip = new Manipulator();
manip.initialize();


// LAYOUT FITTING //

$(document).ready(function() {
	organize();
});

$(window).resize(function() {
	organize();
});

function organize() {

	var w_width = $(window).width();
	$('#left').width((w_width - CANVAS_WIDTH) / 2);
	$('#right').width((w_width - CANVAS_WIDTH) / 2);
}