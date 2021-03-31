const Menu = (() => {

    const menuElement = document.getElementById("menu");
    const openMenuButton = document.getElementById("menu__open");
    const closeMenuButton = document.getElementById("menu__close");

    const runButton = document.getElementById("buttonRun");
    const resetButton = document.getElementById("buttonReset");
    const stopButton = document.getElementById("buttonStop");

    openMenuButton.onclick = function () {
        openMenuButton.style.display = "none";
        menuElement.style.display = "block";
    };

    closeMenuButton.onclick = function () {
        openMenuButton.style.display = "block";
        menuElement.style.display = "none";
    }


    ////////////////////////////////////////
    // Differential equation
    ////////////////////////////////////////
    const coefficientInputs = [...document.querySelectorAll('[name^="coefficient"]')];
    coefficientInputs.forEach((coeff, index) => {
        coeff.onchange = function () {
            const coefficients = ODEPlotter.getEquationCoefficients();
            coefficients[index] = Number(coeff.value);
            ODEPlotter.setEquationCoefficients(coefficients);
        }
    });

    const particleSizeInput = document.getElementById("settings-particle-size");
    const particleTrailInput = document.getElementById("settings-particle-trail");
    const particleQuantityInput = document.getElementById("settings-particle-quantity");
    const randomiseButton = document.getElementById("buttonRandomise");

    const setRandomCoefficients = (range) => {
        const coefficients = Array(4).fill(0);
        for (let i = 0; i < coefficients.length; i++) {
            const randomCoefficient = Math.floor(range * (2*Math.random() - 1));
            coefficients[i] = coefficientInputs[i].value = randomCoefficient;
        }
        ODEPlotter.setEquationCoefficients(coefficients);
    }

    randomiseButton.onclick = function() {
        canvas.reset();
        setRandomCoefficients(2);
        coefficientInputs[0].onchange(); // Not being called when changing the parameters in JS
        ODEPlotter.clearParticles();
        ODEPlotter.addParticles(
            Particle.getRandom(
                Number(particleQuantityInput.value),
                canvas.getMaxDimension(),
                Number(particleSizeInput.value)
            )
        );
        ODEPlotter.run();
    }

    ////////////////////////////////////////
    // Particle settings
    ////////////////////////////////////////
    const defaultParticleSize = 2;
    const defaultParticleQuantity = 100;
    const defaultParticleTrail = 0.9;

    particleSizeInput.onchange = function() {
        const particles = ODEPlotter.getParticles();
        for(let particle of particles) particle.radius = this.value;
    }

    particleTrailInput.onchange = function() {
        canvas.transparency = 1 - Number(this.value);
    }

    particleQuantityInput.onchange = function() {
        // Check number of particles
        const particles = ODEPlotter.getParticles();
        const numberOfParticles = particles.length;
        const newQuantity = Number(this.value);

        if (newQuantity < numberOfParticles) {
            const truncatedParticles = particles.slice(0, newQuantity - 1);
            ODEPlotter.clearParticles();
            ODEPlotter.addParticles(truncatedParticles);
        } else {
            const difference = newQuantity - numberOfParticles;
            ODEPlotter.addParticles(
                Particle.getRandom(
                    difference,
                    canvas.getMaxDimension(),
                    Number(particleSizeInput.value)
                )
            );
        }
    }

    ////////////////////////////////////////
    // Contorl buttons
    ////////////////////////////////////////
    runButton.onclick = function () {
        ODEPlotter.run();
    }

    stopButton.onclick = function () {
        ODEPlotter.stop();
    }

    resetButton.onclick = function () {
        canvas.reset();
        particleTrailInput.value = canvas.transparency = 0.1;
        ODEPlotter.clearParticles();
        ODEPlotter.addParticles(
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
        ODEPlotter.setEquationCoefficients(defaultCoefficients);
        ODEPlotter.run();

        particleSizeInput.value = defaultParticleSize;
        particleQuantityInput.value = defaultParticleQuantity;
        particleTrailInput.value = defaultParticleTrail;
    }
})();