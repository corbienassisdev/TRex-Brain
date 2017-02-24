"use strict";

var network;

function setup() {
	createCanvas(600, 320);
	network = new Network(width/2, height/2);

	var a = new Neuron(100, 150);
	var b = new Neuron(300, 50);
	var c = new Neuron(300, 150);
	var d = new Neuron(300, 250);
	var e = new Neuron(500, 150);

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