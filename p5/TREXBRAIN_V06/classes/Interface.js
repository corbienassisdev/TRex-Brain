function Interface() {
	this.dps = [];
	this.chart = this.createChart();
	this.updateChart(0, 0); 
}

Interface.prototype.createChart = function() {

	var chart = new CanvasJS.Chart("chartContainer",{
		title :{
			text: "Average fitness per generations",
			fontSize: 16,
			fontWeight: "normal",
			fontStyle: "italic",
			verticalAlign: "bottom"
		},
		axisX:{
			titleFontSize: 16,
			title : "Number of generations",
		},
		axisY:{
			titleFontSize: 16,
			title : "average fitnesses",
			gridThickness: 1,
			gridColor: "rgb(210, 210, 210)"
		},		
		data: [{
			type: "spline",
			dataPoints: this.dps,
            color: "rgb(255, 0, 128)",
		}]
	});

	return chart;
};

Interface.prototype.updateChart = function(x, y){

	this.dps.push({
		x: x,
		y: y
	});
		
	this.chart.render();
};

Interface.organize = function() {

	var w_width = $(window).width();
	$('#left').width((w_width - CANVAS_WIDTH) / 2);
	$('#right').width((w_width - CANVAS_WIDTH) / 2);
};
