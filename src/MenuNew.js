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
        this.particleSizeInput = document.getElementById("settings-particle-size");
        this.particleTrailInput = document.getElementById("settings-particle-trail");
        this.particleQuantityInput = document.getElementById("settings-particle-quantity");
        this.randomiseButton = document.getElementById("buttonRandomise");
        this.defaultParticleSize = 2;
        this.defaultParticleQuantity = 100;
        this.defaultParticleTrail = 0.9;

        this.registerEventListeners();
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
        this.openMenuButton.onclick = function () {
            this.openMenuButton.style.display = "none";
            this.menuElement.style.display = "block";
        };
    
        this.closeMenuButton.onclick = function () {
            this.openMenuButton.style.display = "grid";
            this.menuElement.style.display = "none";
        } 

        this.coefficientInputs.forEach((coeff, index) => {
            coeff.onchange = function () {
                const coefficients = DEPlotter.getEquationCoefficients();
                coefficients[index] = Number(coeff.value);
                DEPlotter.setEquationCoefficients(coefficients);
            }
        });

        randomiseButton.onclick = function() {
            canvas.reset();
            setRandomCoefficients(2);
            coefficientInputs[0].onchange(); // Not being called when changing the parameters in JS
            DEPlotter.clearParticles();
            DEPlotter.addParticles(
                Particle.getRandom(
                    Number(particleQuantityInput.value),
                    canvas.getMaxDimension(),
                    Number(particleSizeInput.value)
                )
            );
            DEPlotter.run();
        }

        particleSizeInput.onchange = function() {
            const particles = DEPlotter.getParticles();
            for(let particle of particles) particle.radius = this.value;
        }
    
        particleTrailInput.onchange = function() {
            canvas.transparency = 1 - Number(this.value);
        }
    
        particleQuantityInput.onchange = function() {
            // Check number of particles
            const particles = DEPlotter.getParticles();
            const numberOfParticles = particles.length;
            const newQuantity = Number(this.value);
    
            if (newQuantity < numberOfParticles) {
                const truncatedParticles = particles.slice(0, newQuantity - 1);
                DEPlotter.clearParticles();
                DEPlotter.addParticles(truncatedParticles);
            } else {
                const difference = newQuantity - numberOfParticles;
                DEPlotter.addParticles(
                    Particle.getRandom(
                        difference,
                        canvas.getMaxDimension(),
                        Number(particleSizeInput.value)
                    )
                );
            }
        }

        this.runButton.onclick = function () {
            DEPlotter.run();
        }
    
        this.stopButton.onclick = function () {
            DEPlotter.stop();
        }
    
        this.resetButton.onclick = function () {
            canvas.reset();
            particleTrailInput.value = canvas.transparency = 0.1;
            DEPlotter.clearParticles();
            DEPlotter.addParticles(
                Particle.getRandom(
                    defaultParticleQuantity,
                    canvas.getMaxDimension(),
                    defaultParticleSize
                )
            );
            const defaultCoefficients = [1, 0, 0, -1];
            defaultCoefficients.forEach((coeff, index) => {
                coefficientInputs[index].value = coeff;
            });
            DEPlotter.setEquationCoefficients(defaultCoefficients);
            DEPlotter.run();
    
            particleSizeInput.value = defaultParticleSize;
            particleQuantityInput.value = defaultParticleQuantity;
            particleTrailInput.value = defaultParticleTrail;
        }
    }
}