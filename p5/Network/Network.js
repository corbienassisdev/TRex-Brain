function Network() {
	this.neurons = [];
}

Network.prototype.addNeuron = function(n) {
	this.neurons.push(n);
};

Network.prototype.display = function() {
	for(var i = 0; i < this.neurons.length; i++) {
		this.neurons[i].display();
	}
};

Network.prototype.connect = function(a, b) {
	var c = new Connection(a, b, random(1));
	a.addConnection(c);
};