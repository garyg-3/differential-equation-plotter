import Canvas from './src/Canvas.js';
import ConfigMenu from './src/ConfigMenu.js';
import DEPlotter from './src/DEPlotter.js';
import Particle from './src/Particle.js';
import Equation from './src/Equation.js';

const canvas = new Canvas("canvas");
const configMenu = new ConfigMenu(canvas);
const equation = new Equation([1, 0, 0, 1]);
const newParticles
    = Particle.getRandom(100, canvas.getMaxDimension(), 2);
    
DEPlotter.setCanvas(canvas);
DEPlotter.addParticles(newParticles);
DEPlotter.run();