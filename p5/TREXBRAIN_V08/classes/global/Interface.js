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

	var data = ['GENERATION NUMBER', 'GENOMES PER GENERATION', 'MUTATION RATE', 'ELITE CLONES', 'TOP FITNESS', 'AVERAGE FITNESS'];

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
    row.children().last().text(value);
};


Interface.prototype.createStatus = function(game) {

	$('#stat').empty();

	var SCREEN_HEIGHT = $(window).height();

	for(var i=0; i<Manipulator.N_MAX; i++) {

		var div = $('<div>');
		div.height(SCREEN_HEIGHT/Manipulator.N_MAX - 1);
		div.css('border-bottom', '1px solid rgb(50,50,50)');
		div.css('line-height', div.height() + 'px');
		div.css('vertical-align', 'middle');
		$('#stat').append(div);
	}

	var divs = $('#stat').children();

	game.dinosaures.forEach(function(d, i) {

		if(d.status != Dinosaure.status.CRASHED) {
			divs.eq(i).html('<span style="display: inline-block; background-color: green; color: white; height: ' + divs.eq(i).height() + 'px">&nbsp;RUNNING&nbsp;</span> | JUMPED : ' + d.jumped);
		}
		else {
			divs.eq(i).html('<span style="display: inline-block; background-color: red; color: white; height: ' + divs.eq(i).height() + 'px">&nbsp;CRASHED&nbsp;</span> | JUMPED : ' + d.jumped);
		}
	});
};


Interface.prototype.updateStatus = function(game, i) {

	var divs = $('#stat').children();

	if(game.dinosaures[i].status != Dinosaure.status.CRASHED) {
		divs.eq(i).html('<span style="display: inline-block; background-color: green; color: white; height: ' + divs.eq(i).height() + 'px">&nbsp;RUNNING&nbsp;</span> | JUMPED : ' + game.dinosaures[i].jumped);
	}
	else {
		divs.eq(i).html('<span style="display: inline-block; background-color: rgb(220,0,0); color: white; height: ' + divs.eq(i).height() + 'px">&nbsp;CRASHED&nbsp;</span> | JUMPED : ' + game.dinosaures[i].jumped);
	}
};


Interface.prototype.createInputs = function() {

	$('#perc').empty();

	for(var i=0; i<4; i++) {

		div = $('<div>');
		div.height($('#perc').height() / 4);
		div.width($('#perc').width() / 1.5);

		switch(i) {
			case 0:
				div.html('SPEED:');
				div.css('transition', 'width 0.5s'); 
				break;
			case 1:
				div.html('DISTANCE:');
				break;
			case 2:
				div.html('WIDTH:');
				div.css('transition', 'width 0.5s'); 
				break;
			case 3:
				div.html('HEIGHT:');
				div.css('transition', 'width 0.5s'); 
				break;
		}
		
		div.css('background-color', 'grey');
		div.css('border', '1px solid rgb(100,100,100)');
		
		$('#perc').append(div);
	}
};


Interface.prototype.updateInputs = function(inputs) {
	
	var divs = $('#perc').children();

	for(var i=0; i<inputs.length; i++) {

		switch(i) {
			case 0: divs.eq(i).html('SPEED:' + '<br />' + (inputs[i] * 100).toFixed(2) + '%'); break;
			case 1: divs.eq(i).html('DISTANCE:' + '<br />' + (inputs[i] * 100).toFixed(2) + '%'); break;
			case 2: divs.eq(i).html('WIDTH:' + '<br />' + (inputs[i] * 100).toFixed(2) + '%'); break;
			case 3: divs.eq(i).html('HEIGHT:' + '<br />' + (inputs[i] * 100).toFixed(2) + '%'); break;
		}

		divs.eq(i).width($('#perc').width() * inputs[i] / 1.5);
	}
};


Interface.prototype.log = function(text) {

	var content = $('#logs').html();
	$('#logs').html(content + text + '<br />');
	$("#logs").scrollTop($("#logs")[0].scrollHeight);
};

