function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 2;
	this.colours = [ 'white' ];
	this.colour = this.colours[Math.floor(Math.random()*this.colours.length)];
	this.draw = function() {
		context.beginPath();
		context.fillStyle = this.colour;
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}
}