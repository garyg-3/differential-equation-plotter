# Linear constant coefficient differential equation plotter
A Javascript program, providing a visual representation of the solution trajectories of the aforementioned differential equation.

## Background
The long name for this repository refers to equations of the form
dy/dt = ax + by,
dx/dt = cx + dy.
This can be written as dy/dx = (ax + by)/(cx + dy).
The program will animate the solutions to these equations as time progresses.


## Usage
The program can be cloned as is, and you can get started investigating the interesting trajectories generated from the equations.
A settings menu is provided to allow easy alteration of the equation, along with visual settings for the particles.


## Embed in your own app
To use this project in your own app, simply include the following scripts (ordering necessary due to dependencies):
```html
<script type="text/javascript" src="Particle.js"></script>
<script type="text/javascript" src="Canvas.js"></script>
<script type="text/javascript" src="DEPlotter.js"></script>
```
Then use a script like the following to setup the program:
```js
const canvas = new Canvas("canvas");    // Setup a target Canvas for the program
const newParticles = Particle.getRandom(quantity, maxSpawnRadius, particleRadius); // Generate some particles to display
    
DEPlotter.addParticles(newParticles);  // Add the particles to the simulation
DEPlotter.run();                       // Enjoy!
 ```

To alter the coefficients from a script, use 
```js
DEPlotter.setEquationCoefficients([a, b, c, d]); // Where a,b,c,d are the 4 corresponding coefficients in the equation
```

The menu is dependent on elements hardcoded in the main.html file, and so will not work out-of-the-box on other projects. This will be to come in the near future!
