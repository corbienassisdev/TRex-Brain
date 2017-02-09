function Horizon() {
	this.position = {x: 0, y: 130};
	this.sprite;

	this.init = function(game) {
		this.position;
		this.state;
		this.sprite = loadImage('sprites/horizon.png');
	}

	this.display = function() {
		clear();
		image(this.sprite, this.position.x, this.position.y);
	}
}