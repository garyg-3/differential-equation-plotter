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

    particleSizeInput.onchange = function() {
        const particles = ODEPlotter.getParticles();
        for(let particle of particles) particle.radius = this.value;
    }

    particleTrailInput.onchange = function() {
        tranparency = this.value;
    }

    // particleQuantityInput.onchange = function() {

    // }


    // Control Buttons
    const generateRandomParticles = (quantity, radius, size) => {
        const particles = [];
        for (let i = 0; i < quantity; i++) {
            const x = Math.floor((Math.random() - 0.5) * radius) * 1;
            const y = Math.floor((Math.random() - 0.5) * radius) * 1;

            particles.push(new Particle(x, y, size));
        }
        return particles;
    }
    runButton.onclick = function () {
        ODEPlotter.run();
    }

    stopButton.onclick = function () {
        ODEPlotter.stop();
    }

    resetButton.onclick = function () {
        resetCanvas();
        ODEPlotter.clearParticles();
        ODEPlotter.addParticles(
            generateRandomParticles(
                1000,
                Math.max(width, height),
                defaultParticleSize
            )
        );
        const defaultCoefficients = [1, 0, 0, -1];
        defaultCoefficients.forEach((coeff, index) => {
            coefficientInputs[index].value = coeff;
        });
        ODEPlotter.setEquationCoefficients(defaultCoefficients);
        ODEPlotter.run();
    }

    randomiseButton.onclick = function() {
        resetCanvas();
        ODEPlotter.clearParticles();
        ODEPlotter.addParticles(
            generateRandomParticles(
                1000,
                Math.max(width, height),
                Number(particleSizeInput.value)
            )
        );
        ODEPlotter.run();
    }
    randomiseButton.onclick();
})();