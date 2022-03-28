import Canvas from './src/Canvas.js';
import ConfigMenu from './src/ConfigMenu.js';
import Particle from './src/Particle.js';
import Equation from './src/Equation.js';
import EquationUI from './src/equation/EquationUI.js';
import EquationRunner from './src/EquationRunner.js';

const canvas = new Canvas("canvas");
const particles = Particle.getRandom(100, canvas.getMaxDimension(), 2);
const equation = new Equation([1, 0, 0, -1]);
const equationUI = new EquationUI(equation);

const equationRunner = new EquationRunner(
    equation,
    particles,
    canvas
);
const configMenu = new ConfigMenu(canvas, equationRunner, equationUI);

equationRunner.run();