function particle(x, y) {
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.time = 0;
	this.timeScale = 0.005;
	this.radius = getDistanceFromCentre(this.x, this.y);
	this.angle = getAngle(this.x, this.y);
	this.colours = [ 'blue', /*'red', 'green',*/ 'white', /*'brown''purple'*/];
	this.colour = this.colours[Math.floor(Math.random()*this.colours.length)];
	this.update = function() {
		this.time += 1/20;
		let time = this.time;
		let scale = this.timeScale;
		let coordX = this.x - width/2;
		let coordY = -(this.y - height/2);
		let radius = getDistanceFromCentre(this.x, this.y);
		let angle = getAngle(this.x, this.y);

		//Spatial dependence
		coordY += scale*(-10*Math.cos(time)* coordX + 0*coordY);
		coordX += scale*(0* coordX + 10*Math.cos(time)*coordY);

		//Temporal dependence
		// coordX += 2*(Math.cos(time/10));
		// coordY += 2*(Math.sin(time/10));

		this.x = coordX + width/2;
		this.y = -coordY + height/2;
	}
	this.draw = function() {
		context.fillStyle = this.colour;
		context.fillRect(this.x, this.y, 2, 2);
	}
}

function getDistanceFromCentre(x, y) {
	let radius = Math.sqrt((x - width)^2 + (y - height)^2);
	return radius;
}

function getAngle(x, y) {
	let angle = Math.atan2((y - height/2), (x - width/2));			
	return angle;
}