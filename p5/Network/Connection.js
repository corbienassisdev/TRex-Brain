function Connection(a, b, w) {
	this.orig = a;
	this.dest = b;
	this.weight = w;
}

Connection.prototype.display = function() {
	stroke(0);
	strokeWeight(this.weight*4);
	line(this.orig.x, this.orig.y, this.dest.x, this.dest.y);
};