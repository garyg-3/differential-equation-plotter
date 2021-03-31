const canvas = new Canvas("canvas");
const newParticles
    = Particle.getRandom(100, canvas.getMaxDimension(), 2);
    
DEPlotter.addParticles(newParticles);
DEPlotter.run();