const particles = [];
for (let i = 0; i <= 1000; i++) {
	const x = Math.floor((Math.random() * width - width/2) * 2);
	const y = Math.floor((Math.random() * width - width/2) * 2);

	particles.push(new Particle(x, y));
}

ODEPlotter.addParticles(particles);
ODEPlotter.run();