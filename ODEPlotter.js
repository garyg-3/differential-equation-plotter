const ODEPlotter = (function(){

    let equationCoefficients = [1, 0, 0, -1];
    let animationSpeed = 10;
    let intervalID = null;
    let timeScale = 200;
    let particles = [];
    let maxDisplacement = 1000;
    let minDisplacement = 2;

    const randomiseParticle = (particle, range) => {
        const x = (Math.random() - 0.5) * range;
        const y = (Math.random() - 0.5) * range;
        particle.x = x;
        particle.y = y;
    }

    const updateParticle = (particle) => {
        // Ordinary differential equations (ODE) of form:
        // dy/dx = (ax + by) / (cx + dy)
        const coordY = particle.y;
        const coordX = particle.x;

        const dy = equationCoefficients[0] * coordX
                    + equationCoefficients[1] * coordY;
        const dx = equationCoefficients[2] * coordX
                    + equationCoefficients[3] * coordY;

        particle.y += dy / timeScale;
        particle.x += dx / timeScale;
        const distanceToParticle = particle.displacement();
        if (distanceToParticle > maxDisplacement) {
            randomiseParticle(particle, Math.max(width, height));
        } else if (distanceToParticle < minDisplacement) {
            randomiseParticle(particle, Math.max(width, height) * 2);
        }
        particle.draw();
    }

    const updateParticles = () => {
        clearCanvas();
        particles.forEach(particle => updateParticle(particle));
    }


    return {
        setEquationCoefficients: function(newCoefficients) {
            equationCoefficients = newCoefficients;
        },

        getEquationCoefficients: function() {
            return equationCoefficients;
        },

        addParticle: function(newParticle) {
            particles.push(newParticle);
        },

        addParticles: function(newParticles) {
            newParticles.forEach(particle => this.addParticle(particle));
        },

        clearParticles: function() {
            particles = [];
        },

        getParticles: function() {
            return particles;
        },

        setMaxDisplacement: function(displacement) {
            maxDisplacement = displacement;
        },

        getMaxDisplacement: function() {
            return maxDisplacement;
        },

        run: function() {
            if (!intervalID) {
                intervalID = setInterval(updateParticles, animationSpeed);
            }
        },

        stop: function() {
            clearInterval(intervalID);
            intervalID = null;
        }
    }
})();