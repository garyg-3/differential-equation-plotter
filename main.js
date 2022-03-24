import Canvas from './src/Canvas.js';
import Menu from './src/Menu.js';
import HelpMenu from './src/HelpMenu.js';
import DEPlotter from './src/DEPlotter.js';
import Particle from './src/Particle.js';

const canvas = new Canvas("canvas");
const menu = new Menu(canvas);
const helpMenu = new HelpMenu();
const newParticles
    = Particle.getRandom(100, canvas.getMaxDimension(), 2);
    
DEPlotter.setCanvas(canvas);
DEPlotter.addParticles(newParticles);
DEPlotter.run();