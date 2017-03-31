function Cloud(game) {
	
	this.game = game;

	this.width = 46;
	this.height = 13;

	this.x = canvas.width;
	this.y = floor(random(10, 60));

	this.sprite = this.game.sprites['cloud'];
}


Cloud.prototype.update = function(speed) {

	this.x -= speed / 8;
};


Cloud.prototype.show = function() {

	context.drawImage(this.sprite, this.x, this.y);
};