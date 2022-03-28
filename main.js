import Canvas from './src/Canvas.js';
import ConfigMenu from './src/ConfigMenu.js';
import DEPlotter from './src/DEPlotter.js';
import Particle from './src/Particle.js';
import Equation from './src/Equation.js';
import EquationUI from './src/equation/EquationUI.js';
import ParticlePlotter from './src/ParticlePlotter.js';
import ParticleUpdater from './src/ParticleUpdater.js';
import EquationRunner from './src/EquationRunner.js';

const canvas = new Canvas("canvas");
const particles = Particle.getRandom(100, canvas.getMaxDimension(), 2);
const equation = new Equation([1, 0, 0, 1]);
const equationUI = new EquationUI(equation);

const particleUpdater = new ParticleUpdater(particles, equation);
const particlePlotter = new ParticlePlotter(particles, canvas);
const equationRunner = new EquationRunner(particleUpdater, particlePlotter);
const configMenu = new ConfigMenu(canvas, equationRunner);

equationRunner.run();