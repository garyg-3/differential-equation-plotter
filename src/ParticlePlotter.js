class ParticlePlotter {
    constructor(particles, canvas) {
        this.particles = particles;
        this.canvas = canvas;
        this.context = canvas.context;
    }

    draw() {
        this.canvas.clear();
        this.particles.forEach(particle => {
            particle.draw(this.context);
        })
    }
}

export default ParticlePlotter;