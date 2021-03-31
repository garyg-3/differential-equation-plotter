const Menu = (() => {

    const menuElement = document.getElementById("menu");
    const openMenuButton = document.getElementById("menu__open");
    const closeMenuButton = document.getElementById("menu__close");
    const coefficientInputs = [...document.querySelectorAll('[name^="coefficient"]')];

    const runButton = document.getElementById("buttonRun");
    const resetButton = document.getElementById("buttonReset");
    const randomiseButton = document.getElementById("buttonRandomise");
    const stopButton = document.getElementById("buttonStop");

    coefficientInputs.forEach((coeff, index) => {
        coeff.onchange = function () {
            const coefficients = ODEPlotter.getEquationCoefficients();
            coefficients[index] = Number(coeff.value);
            ODEPlotter.setEquationCoefficients(coefficients);
        }
    });

    openMenuButton.onclick = function () {
        openMenuButton.style.display = "none";
        menuElement.style.display = "block";
    };

    closeMenuButton.onclick = function () {
        openMenuButton.style.display = "block";
        menuElement.style.display = "none";
    }

    ////////////////////////////////////////
    // Particle settings
    ////////////////////////////////////////
    const particleSizeInput = document.getElementById("settings-particle-size");
    const particleTrailInput = document.getElementById("settings-particle-trail");
    const particleQuantityInput = document.getElementById("settings-particle-quantity");
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

    randomiseButton.onclick = function() {
        canvas.reset();
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
    randomiseButton.onclick();
})();