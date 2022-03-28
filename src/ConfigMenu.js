import RecordButton from "./RecordButton.js";
import DEPlotter from "./DEPlotter.js";
import Particle from "./Particle.js";

const fadeInAnimation = [
    { 
        transform: 'translate(0, 0)',
        opacity: '1'
    },
    { 
        transform: 'translate(20px, -20px)',
        opacity: '0'
    }
];

class ConfigMenu {
    constructor(canvas, equationRunner, equationUI) {
        this.canvas = canvas;
        this.equationRunner = equationRunner;
        this.equationUI = equationUI;

        this.openButton = document.getElementById('config-menu-open');
        this.closeButton = document.getElementById('config-menu-close');

        this.htmlElement = document.getElementById('config-menu');

        this.runButton = document.getElementById("buttonRun");
        this.resetButton = document.getElementById("buttonReset");
        this.stopButton = document.getElementById("buttonStop");

        this.particleQuantityInput = document.getElementById("settings-particle-quantity");
        this.particleSizeInput = document.getElementById("settings-particle-size");
        this.particleTrailInput = document.getElementById("settings-particle-trail");
        this.recordButton = new RecordButton(
            document.getElementById('buttonCapture')
        );

        this.defaultParticleSize = 2;
        this.defaultParticleQuantity = 100;
        this.defaultParticleTrail = 0.9;
        this.isOpen = false;

        this.registerEventListeners();
    }

    handleOpen() {
        this.openButton.style.display = 'none';
        this.htmlElement.style.display = 'block';
        this.animateOpen();
    }

    handleClose() {
        this.openButton.style.display = 'grid';
        this.animateClose();
    }

    async animateClose() {
        const animation = this.htmlElement.animate(fadeInAnimation, {
            duration: 1000
        })
        await animation.finished;
        this.handleAnimationEnd();
    }

    async animateOpen() {
        const animation = this.htmlElement.animate(fadeInAnimation, {
            direction: 'reverse',
            duration: 1000
        })
        await animation.finished;
        this.handleAnimationEnd();
    }

    handleAnimationEnd() {
        if (this.isOpen) {
            this.htmlElement.style.display = 'none';
            this.isOpen = false;
        } else {
            this.isOpen = true;
        }
    }

    updateParticleSize(size) {
        this.equationRunner.particles.forEach(particle => {
            particle.radius = size;
        })
    }

    updateParticleQuantity(newQuantity) {
        const particles = this.equationRunner.particles;
        const numberOfParticles = particles.length;

        if (newQuantity < numberOfParticles) {
            const truncatedParticles = particles.slice(0, newQuantity - 1);
            this.equationRunner.clearParticles();
            this.equationRunner.addParticles(truncatedParticles);
        } else {
            const difference = newQuantity - numberOfParticles;
            this.equationRunner.addParticles(
                Particle.getRandom(
                    difference,
                    this.canvas.getMaxDimension(),
                    Number(this.particleSizeInput.value)
                )
            );
        }
    }

    registerEventListeners() {
        this.openButton.addEventListener('click', this.handleOpen.bind(this));
        this.closeButton.addEventListener('click', this.handleClose.bind(this));
        this.htmlElement.addEventListener('animationend', this.handleAnimationEnd.bind(this));

        this.particleQuantityInput.onchange = (event) => {
            this.updateParticleQuantity(event.target.value);
            console.log(this.equationRunner.particles);
        }

        this.particleSizeInput.onchange = (event) => {
            this.updateParticleSize(event.target.value);
        }
    
        this.particleTrailInput.onchange = (event) => {
            this.canvas.transparency = 1 - Number(event.target.value);
        }

        this.runButton.onclick = () => {
            this.equationRunner.run();
        }
    
        this.stopButton.onclick = () => {
            this.equationRunner.stop();
        }
    
        this.resetButton.onclick = () => {
            this.equationRunner.reset();
                    
            this.particleTrailInput.value = this.canvas.transparency = 0.1;
            this.particleSizeInput.value = this.defaultParticleSize;
            this.particleQuantityInput.value = this.defaultParticleQuantity;
            this.particleTrailInput.value = this.defaultParticleTrail;
            this.updateParticleQuantity(this.defaultParticleQuantity);
            this.updateParticleSize(this.defaultParticleSize);
        }
    }
}

export default ConfigMenu;