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
    constructor(canvas, equationRunner) {
        this.canvas = canvas;
        this.equationRunner = equationRunner;
        this.openButton = document.getElementById('config-menu-open');
        this.closeButton = document.getElementById('config-menu-close');
        this.htmlElement = document.getElementById('config-menu');
        this.runButton = document.getElementById("buttonRun");
        this.resetButton = document.getElementById("buttonReset");
        this.stopButton = document.getElementById("buttonStop");
        this.coefficientInputs = [...document.querySelectorAll('[name^="coefficient"]')];
        this.particleQuantityInput = document.getElementById("settings-particle-quantity");
        this.particleSizeInput = document.getElementById("settings-particle-size");
        this.particleTrailInput = document.getElementById("settings-particle-trail");
        this.randomiseButton = document.getElementById("buttonRandomise");
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

    registerEventListeners() {
        this.openButton.addEventListener('click', this.handleOpen.bind(this));
        this.closeButton.addEventListener('click', this.handleClose.bind(this));
        this.htmlElement.addEventListener('animationend', this.handleAnimationEnd.bind(this));

        this.coefficientInputs.forEach((coeff, index) => {
            coeff.onchange = () => {
                const coefficients = DEPlotter.getEquationCoefficients();
                coefficients[index] = Number(coeff.value);
                DEPlotter.setEquationCoefficients(coefficients);
            }
        });

        this.randomiseButton.onclick = () => {
            this.canvas.reset();
            const coefficients = DEPlotter.setRandomCoefficients(2);
            // this.setCoefficientInputValues(coefficients);
            // this.coefficientInputs[0].onchange(); // Not being called when changing the parameters in JS
            DEPlotter.clearParticles();
            DEPlotter.addParticles(
                Particle.getRandom(
                    Number(this.particleQuantityInput.value),
                    this.canvas.getMaxDimension(),
                    Number(this.particleSizeInput.value)
                )
            );
            DEPlotter.run();
        }

        this.particleSizeInput.onchange = (event) => {
            const particles = DEPlotter.getParticles();
            for(let particle of particles) particle.radius = event.target.value;
        }
    
        this.particleTrailInput.onchange = (event) => {
            this.canvas.transparency = 1 - Number(event.target.value);
        }
    
        this.particleQuantityInput.onchange = (event) => {
            // Check number of particles
            const particles = DEPlotter.getParticles();
            const numberOfParticles = particles.length;
            const newQuantity = Number(event.target.value);
    
            if (newQuantity < numberOfParticles) {
                const truncatedParticles = particles.slice(0, newQuantity - 1);
                DEPlotter.clearParticles();
                DEPlotter.addParticles(truncatedParticles);
            } else {
                const difference = newQuantity - numberOfParticles;
                DEPlotter.addParticles(
                    Particle.getRandom(
                        difference,
                        this.canvas.getMaxDimension(),
                        Number(this.particleSizeInput.value)
                    )
                );
            }

            console.log(DEPlotter.getParticles());
        }

        this.runButton.onclick = () => {
            this.equationRunner.run();
        }
    
        this.stopButton.onclick = () => {
            this.equationRunner.stop();
        }
    
        this.resetButton.onclick = () => {
            this.canvas.reset();
            this.particleTrailInput.value = this.canvas.transparency = 0.1;
            DEPlotter.clearParticles();
            DEPlotter.addParticles(
                Particle.getRandom(
                    this.defaultParticleQuantity,
                    this.canvas.getMaxDimension(),
                    this.defaultParticleSize
                )
            );
            const defaultCoefficients = [1, 0, 0, -1];
            defaultCoefficients.forEach((coeff, index) => {
                this.coefficientInputs[index].value = coeff;
            });
            DEPlotter.setEquationCoefficients(defaultCoefficients);
            DEPlotter.run();
    
            this.particleSizeInput.value = this.defaultParticleSize;
            this.particleQuantityInput.value = this.defaultParticleQuantity;
            this.particleTrailInput.value = this.defaultParticleTrail;
        }
    }
}

export default ConfigMenu;