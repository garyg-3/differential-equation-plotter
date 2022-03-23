import Canvas from './src/Canvas.js';
import getMenu from './src/Menu.js';
import DEPlotter from './src/DEPlotter.js';
import Particle from './src/Particle.js';

const canvas = new Canvas("canvas");
const Menu = getMenu(canvas);
const newParticles
    = Particle.getRandom(100, canvas.getMaxDimension(), 2);
    
DEPlotter.setCanvas(canvas);
DEPlotter.addParticles(newParticles);
DEPlotter.run();