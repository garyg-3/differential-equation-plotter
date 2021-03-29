const ODEPlotter = (function(){

    let equationCoefficients = [-1, 1, -1, 0];
    let animationSpeed = 10;
    let intervalID = null;
    let timeScale = 200;
    const particles = [];

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
        addParticle: function(particle) {
            particles.push(particle);
        },
        addParticles: function(particles) {
            particles.forEach(particle => this.addParticle(particle));
        },
        getParticles: function() {
            return particles;
        },
        run: function() {
            intervalID = setInterval(updateParticles, animationSpeed);
        },
        stop: function() {
            clearInterval(intervalID);
        }
    }
})();