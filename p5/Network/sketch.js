"use strict";

var network;

function setup() {
	createCanvas(600, 320);
	network = new Network(width/2, height/2);

	var input = Network.layers.INPUT;
	var hidden = Network.layers.HIDDEN;
	var output = Network.layers.OUTPUT;

	var n1  = new Neuron(100, 100, input);
	var n2  = new Neuron(100, 150, input);
	var n3  = new Neuron(100, 200, input);
	var n4  = new Neuron(300, 250, hidden);
	var n5  = new Neuron(500, 150, hidden);
	var n6  = new Neuron(500, 150, hidden);
	var n7  = new Neuron(500, 150, hidden);
	var n8  = new Neuron(500, 150, hidden);
	var n9  = new Neuron(500, 150, hidden);
	var n10 = new Neuron(500, 150, hidden);
	var n11 = new Neuron(500, 150, hidden);
	var n12 = new Neuron(500, 150, hidden);
	var n13 = new Neuron(0, 0, output);
	var n14 = new Neuron(0, 0, output);

	network.addNeuron(n1);
	network.addNeuron(n2);
	network.addNeuron(n3);
	network.addNeuron(n4);
	network.addNeuron(n5);
	network.addNeuron(n6);
	network.addNeuron(n7);
	network.addNeuron(n8);
	network.addNeuron(n9);
	network.addNeuron(n10);
	network.addNeuron(n11);
	network.addNeuron(n12);

	network.connect(a,b);
	network.connect(a,c);
	network.connect(a,d);
	network.connect(b,e);
	network.connect(c,e);
	network.connect(d,e);
}


function draw() {
	background(255);
	network.update();
	network.display();
}