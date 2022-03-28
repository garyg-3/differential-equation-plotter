import ParticleUpdater from "./ParticleUpdater.js";
import ParticlePlotter from "./ParticlePlotter.js";

class EquationRunner {
    constructor(equation, particles, canvas) {
        this.equation = equation;
        this.particles = particles;
        this.canvas = canvas;
        this.particleUpdater = new ParticleUpdater(particles, equation);
        this.particlePlotter = new ParticlePlotter(particles, canvas);
        this.animationId = null
    }

    randomiseCoefficients(range) {
        for (let i = 0; i < this.equation.coefficients.length; i++) {
            const randomCoefficient = Math.floor(range * (2*Math.random() - 1));
            this.equation.setCoefficient(i, randomCoefficient);
        }
    }

    reset() {
        this.equation.reset();
        this.particlePlotter.clear();
    }

    step() {
        this.particleUpdater.updateParticles();
        this.particlePlotter.draw();
        if (this.animationId) {
            requestAnimationFrame(this.step.bind(this));
        }
    }

    updateParticleReference(newParticles) {
        this.particleUpdater.particles = newParticles;
        this.particlePlotter.particles = newParticles;
    }

    addParticle(newParticle) {
        this.particles.push(newParticle);
        this.updateParticleReference(this.particles);
    }

    addParticles(newParticles) {
        this.particles.push(...newParticles);
        this.updateParticleReference(this.particles);
    }

    clearParticles() {
        this.particles = [];
        this.updateParticleReference(this.particles);
    }

    run() {
        this.animationId = requestAnimationFrame(this.step.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
}

export default EquationRunner;