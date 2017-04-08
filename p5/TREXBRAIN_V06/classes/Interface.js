function Interface() {
	this.dpsAvg = [];
	this.dpsTop = [];
	this.chart = this.createChart();
	this.updateChart(0, 0, 0); 
}

Interface.prototype.createChart = function() {

	var chart = new CanvasJS.Chart("chart",{
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
			labelFontSize: 14,
			minimum: 0
		},
		axisY:{
			titleFontSize: 16,
			title : "average fitnesses",
			labelFontSize: 14,
			gridThickness: 1,
			gridColor: "rgb(210, 210, 210)",
			minimum: 0
		},		
		data: [
		{
			type: "spline",
			dataPoints: this.dpsAvg,
            color: "rgb(255, 0, 128)"
		},
		{
			type: "spline",
			dataPoints: this.dpsTop,
            color: "rgb(100, 255, 0)"
		}]
	});

	return chart;
};

Interface.prototype.updateChart = function(x, avg, top){

	this.dpsAvg.push({
		x: x,
		y: avg
	});

	this.dpsTop.push({
		x: x,
		y: top
	});
		
	this.chart.render();
};


Interface.log = function(text) {
	//affichage dans le bloc dédié TODO
	console.log(text);
};


Interface.organize = function() {

	var w_width = $(window).width();
	$('#left').width((w_width - CANVAS_WIDTH) / 2);
	$('#right').width((w_width - CANVAS_WIDTH) / 2);
};
