var CANVAS_HEIGHT = 150;
var CANVAS_WIDTH  = 600;


/* Au chargement de la page */
$(window).ready(function() {

	$('body').fadeTo(800, 1);
	layout();
	hide(0);
});


/* Au redimensionnement de la page */
$(window).resize(function() {

	layout();
});


/* Au changement de la checkbox */
$('#checkbox').change(function() {

	var checked = $('#checkbox').is(':checked');

	if(checked) 
		show(800);
	else 
		hide(800);
	
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

	$('#logs').css('transition', 'none');
	$('#logs').height((SCREEN_HEIGHT / 2) - CANVAS_HEIGHT);

	$('#game').height(CANVAS_HEIGHT);
	$('#stat').height(SCREEN_HEIGHT);
}


/* Cache l'interface */
function hide(time) {
	
	/* Fondu sur l'opacité */
	$('#data').fadeTo(time, 0);
	$('#fits').fadeTo(time, 0);
	$('#logs').fadeTo(time, 0);
	$('#perc').fadeTo(time, 0);
	$('#stat').fadeTo(time, 0);

	/* Changement de taille du bloc middle/top pour faire remonter le canvas */
	$('#logs').css('transition', 'height 1s ease');
	$('#logs').height((($(window).height() / 2) - CANVAS_HEIGHT) / 2);
}


/* Affiche l'interface */
function show() {
	
	/* Fondu sur l'opacité */
	$('#data').fadeTo(800, 1);
	$('#fits').fadeTo(800, 1);
	$('#logs').fadeTo(800, 1);
	$('#perc').fadeTo(800, 1);
	$('#stat').fadeTo(800, 1);

	/* Changement de taille du bloc middle/top pour remmettre le canvas au centre */
	var SCREEN_HEIGHT = $(window).height();
	
	$('#logs').height(((SCREEN_HEIGHT / 2) - CANVAS_HEIGHT));
}
