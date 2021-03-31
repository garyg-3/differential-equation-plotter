const canvas = new Canvas("canvas");
const newParticles
    = Particle.getRandom(100, canvas.getMaxDimension(), 2);
    
ODEPlotter.addParticles(newParticles);
ODEPlotter.run();