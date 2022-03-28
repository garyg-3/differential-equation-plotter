class ParticleUpdater {
    constructor(particles, equation) {
        this.particles = particles;
        this.equation = equation;
        this.animationSpeed = 10;
        this.intervalID = null;
        this.timeScale = 200;
        this.maxDisplacement = 1000;
        this.minDisplacement = 2;
        this.spawnRange = 1000;
    }

    randomiseParticle = (particle, range) => {
        particle.x = (Math.random() - 0.5) * range;
        particle.y = (Math.random() - 0.5) * range;
    }

    calculateLinearSum(a, x, b, y) {
        return a * x + b * y;
    }

    isParticleOutsideValidRange(particle) {
        const distanceToParticle = particle.displacement();
        if (distanceToParticle > this.maxDisplacement ||
            distanceToParticle < this.minDisplacement) {
            return true;
        }
        return false;
    }

    updateParticle(particle) {
        // Ordinary differential equations (ODE) of form:
        // dy/dx = (ax + by) / (cx + dy)

        const dy = this.calculateLinearSum(
            this.equation.coefficients[0],
            particle.x,
            this.equation.coefficients[1],
            particle.y
        );

        const dx = this.calculateLinearSum(
            this.equation.coefficients[2],
            particle.x,
            this.equation.coefficients[3],
            particle.y
        );

        particle.y += dy / this.timeScale;
        particle.x += dx / this.timeScale;
        
        if (this.isParticleOutsideValidRange(particle)) {
            this.randomiseParticle(particle, this.spawnRange);
        }
    }

    updateParticles() {
        this.particles.forEach(particle => this.updateParticle(particle));
    }

    setMaxDisplacement(displacement) {
        this.maxDisplacement = displacement;
    }

    getMaxDisplacement() {
        return this.maxDisplacement;
    }
}

export default ParticleUpdater;