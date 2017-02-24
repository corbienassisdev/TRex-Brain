function Neuron() {
	this.display_x;
	this.display_y;
}

Neuron.prototype.display = function() {
	stroke(0);
	fill(0);
	ellipse(this.display_x, this.display_y, 16, 16);
}
