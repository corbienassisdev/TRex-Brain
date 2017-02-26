"use strict";

var network;

function setup() {
	createCanvas(600, 320);
	network = new Network(width/2, height/2);

	var input = Network.layers.INPUT;
	var hidden = Network.layers.HIDDEN;
	var output = Network.layers.OUTPUT;

	var a = new Neuron(100, 150, input);
	var b = new Neuron(100, 250, input);
	var c = new Neuron(300, 150);
	var d = new Neuron(300, 250);
	var e = new Neuron(500, 150, output);

	network.addNeuron(a);
	network.addNeuron(b);
	network.addNeuron(c);
	network.addNeuron(d);
	network.addNeuron(e);

	network.connect(a,b);
	network.connect(a,c);
	network.connect(a,d);
	network.connect(b,e);
	network.connect(c,e);
	network.connect(d,e);
}


function draw() {
	background(255);
	network.display();
}