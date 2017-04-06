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

	var dps = []; // dataPoints

	var chart = new CanvasJS.Chart("chartContainer",{
		title :{
			text: "Average fitness per generations",
          	position: "bottom"
		},			
		data: [{
			type: "spline",
			dataPoints: dps,
            color: "rgb(255, 0, 128)",
		}]
	});

	var xVal = 0;
	var yVal = 0;	
	var updateInterval = 1000;
	var dataLength = 0; // number of dataPoints visible at any point

	var updateChart = function (count) {
		count = count || 1;
		// count is number of times loop runs to generate random dataPoints.
		
		
      yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
      dps.push({
        x: xVal,
        y: yVal
      });
      xVal++;
		
		chart.render();		

	};

	// generates first set of dataPoints
	updateChart(dataLength); 

	// update chart after specified time. 
	setInterval(function(){updateChart()}, updateInterval); 
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