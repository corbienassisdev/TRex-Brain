var CANVAS_HEIGHT = 150;
var CANVAS_WIDTH  = 600;


/* Au chargement de la page */
$(window).ready(function() {
	layout();
});


/* Au redimensionnement de la page */
$(window).resize(function() {
	layout();
});


/* Organise la vue du navigateur pour afficher les divs selon une grille propre */
function layout() {

	var SCREEN_HEIGHT = $(window).height();
	var SCREEN_WIDTH  = $(window).width();

	/* Définition de chaque width */
	$('#left'  ).width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);
	$('#right' ).width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);
	$('#middle').width(CANVAS_WIDTH);

	/* Définition de chaque height */
	$('#data').height(SCREEN_HEIGHT / 2);
	$('#fits').height(SCREEN_HEIGHT / 2);
	$('#perc').height(SCREEN_HEIGHT / 2);

	$('#logs').height((SCREEN_HEIGHT / 2) - CANVAS_HEIGHT);

	$('#game').height(CANVAS_HEIGHT);
	$('#stat').height(SCREEN_HEIGHT);
}


