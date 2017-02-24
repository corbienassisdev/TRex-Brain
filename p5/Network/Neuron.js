function Neuron(x, y) {
	this.x = x;
	this.y = y;

	this.connections = [];
}

Neuron.prototype.addConnection = function(c) {
	this.connections.push(c);
};

Neuron.prototype.display = function() {
	stroke(0);
	fill(0);
	ellipse(this.x, this.y, 32, 32);

	for(var i = 0; i < this.connections.length; i++) {
		this.connections[i].display();
	}
};