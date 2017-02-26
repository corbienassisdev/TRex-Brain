function Neuron(x, y, layer) {
	this.x = x;
	this.y = y;

	this.connections = [];
	this.layer = layer;
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