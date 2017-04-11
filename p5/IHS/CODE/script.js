var CANVAS_HEIGHT = 150;
var CANVAS_WIDTH  = 600;

var SCREEN_HEIGHT = $(window).height();
var SCREEN_WIDTH  = $(window).width();

/* Définition de chaque width */
$('#left'  ).width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);
$('#right' ).width(100);
$('#middle').width(CANVAS_WIDTH);


/*$('#data').width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);
$('#fits').width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);

$('#logs').width(CANVAS_WIDTH);
$('#game').width(CANVAS_WIDTH);
$('#perc').width(CANVAS_WIDTH);

$('#stat').width((SCREEN_WIDTH - CANVAS_WIDTH) / 2);

/* Définition de chaque height */
$('#data').height(SCREEN_HEIGHT / 2);
$('#fits').height(SCREEN_HEIGHT / 2);
$('#perc').height(SCREEN_HEIGHT / 2);

$('#game').height(CANVAS_HEIGHT);

$('#logs').height((SCREEN_HEIGHT / 2) - CANVAS_HEIGHT);

$('#stat').height(SCREEN_HEIGHT);
