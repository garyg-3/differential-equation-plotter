import RecordButton from './RecordButton.js';
import DEPlotter from './DEPlotter.js';
import Particle from './Particle.js';

class Menu {
    constructor(canvas) {
        this.canvas = canvas;
        this.menuElement = document.getElementById("menu");
        this.openMenuButton = document.getElementById("menu__open");
        this.closeMenuButton = document.getElementById("menu__close");
        this.recordButton = new RecordButton(
            document.getElementById('buttonCapture')
        );

        this.runButton = document.getElementById("buttonRun");
        this.resetButton = document.getElementById("buttonReset");
        this.stopButton = document.getElementById("buttonStop");
        this.coefficientInputs = [...document.querySelectorAll('[name^="coefficient"]')];
        this.particleQuantityInput = document.getElementById("settings-particle-quantity");
        this.particleSizeInput = document.getElementById("settings-particle-size");
        this.particleTrailInput = document.getElementById("settings-particle-trail");
        this.randomiseButton = document.getElementById("buttonRandomise");
        this.defaultParticleSize = 2;
        this.defaultParticleQuantity = 100;
        this.defaultParticleTrail = 0.9;

        this.registerEventListeners();
    }

    setCoefficientInputValues(coefficients) {
        this.coefficientInputs.forEach((input, index) => {
            input.value = coefficients[index];
        });
    }

    setRandomCoefficients(range) {
        const coefficients = Array(4).fill(0);
        for (let i = 0; i < coefficients.length; i++) {
            const randomCoefficient = Math.floor(range * (2*Math.random() - 1));
            coefficients[i] = coefficientInputs[i].value = randomCoefficient;
        }
        DEPlotter.setEquationCoefficients(coefficients);
    }

    registerEventListeners() {
        this.openMenuButton.onclick = () => {
            this.openMenuButton.style.display = "none";
            this.menuElement.style.display = "block";
        };
    
        this.closeMenuButton.onclick = () => {
            this.openMenuButton.style.display = "grid";
            this.menuElement.style.display = "none";
        } 

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
            this.setCoefficientInputValues(coefficients);
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
            DEPlotter.run();
        }
    
        this.stopButton.onclick = () => {
            DEPlotter.stop();
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

export default Menu;