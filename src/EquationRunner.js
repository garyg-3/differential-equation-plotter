class EquationRunner {
    constructor(particleUpdater, particlePlotter) {
        this.particleUpdater = particleUpdater;
        this.particlePlotter = particlePlotter;
        this.animationId = null
    }

    step() {
        this.particleUpdater.updateParticles();
        this.particlePlotter.draw();
        if (this.animationId) {
            requestAnimationFrame(this.step.bind(this));
        }
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