function Cloud(game) {
	
	this.game = game;

	this.width = 46;
	this.height = 13;

	this.x = this.game.p5.canvas.width;
	this.y = this.game.p5.floor(this.game.p5.random(10, 60));

	this.sprite = this.game.sprites['cloud'];
}


Cloud.prototype.update = function(speed) {

	this.x -= speed / 8;
};


Cloud.prototype.show = function() {

	this.game.p5.image(this.sprite, this.x, this.y);
};