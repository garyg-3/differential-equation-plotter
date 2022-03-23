function Particle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.colours = [ 'white' ];
	this.colour = this.colours[Math.floor(Math.random()*this.colours.length)];

	this.draw = function(context) {
		context.beginPath();
		context.fillStyle = this.colour;
		// Flip the y value to align with coordinate system
		context.arc(this.x, -this.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}

	this.displacement = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}

Particle.getRandom = function(quantity, radius, size) {
	const particles = [];
	for (let i = 0; i < quantity; i++) {
		const x = Math.floor((Math.random() - 0.5) * radius);
		const y = Math.floor((Math.random() - 0.5) * radius);
		particles.push(new Particle(x, y, size));
	}
	return particles;
}

export default Particle;