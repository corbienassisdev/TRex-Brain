function Interface() {
	this.dpsAvg = [];
	this.dpsTop = [];
	this.chart = this.createChart();
	this.updateChart(0, 0, 0); 
}

Interface.prototype.createChart = function() {

	var chart = new CanvasJS.Chart("fits",{
		title :{
			text: "fitnesses per generations",
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
			title : "fitnesses",
			labelFontSize: 14,
			gridThickness: 1,
			gridColor: "rgb(210, 210, 210)",
			minimum: 0
		},		
		data: [
		{
			type: "line", //ou spline
			dataPoints: this.dpsAvg,
            color: "rgb(0, 119, 255)",
            showInLegend: true,
            legendText: "Average Fitness"
		},
		{
			type: "line",
			dataPoints: this.dpsTop,
            color: "rgb(0, 50, 100)",
            legendText: "Top Fitness",
            showInLegend: true,
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


Interface.prototype.createData = function() {

	var data = ['TIME', 'GENERATION', 'GENOMES PER GENERATION', 'MUTATION RATE', 'ELITE CLONES', 'DINOSAURS ALIVE', 'TOP FITNESS', 'AVERAGE FITNESS'];

	var table = $('<table>');
    
    $.each(data, function(i) {
		row = $('<tr>');

		key = $('<td>').html(data[i] + ' : ');
		value = $('<td>'); //vide pour l'instant

		table.append(row.append(key));
		table.append(row.append(value));
    });

    $('#data').append(table);
};

Interface.prototype.updateData = function(name, value) {

    var table = $('#data').find("table");
    var row = $('tr:has(td:contains("' + name + '"))'); //selection de la ligne contenant le mot clé
    row.children().last().html(value);
};


Interface.prototype.status = function() {

	$('#stat').add('div').text('background-color');
};

Interface.prototype.log = function(text) {

	var content = $('#logs').html();
	$('#logs').html(content + text + '<br />');
};



