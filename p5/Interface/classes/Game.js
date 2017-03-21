function Game() {

	var sketch = function(p) {

		p.preload = function() {
			console.log('preload');
		};

		p.setup = function() {
			p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
			p.background(144);
			console.log(manip);
		};

		p.draw = function() {
			p.background(144);
		};
	};

	this.p5 = new p5(sketch);
}
