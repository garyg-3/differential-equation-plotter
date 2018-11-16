(function(){

	window.onload = function() {

		var canvas = document.getElementById('canvas');
		var context = canvas.getContext("2d");
		var width = canvas.width = window.innerWidth;
		var height = canvas.height = window.innerHeight;
		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		var gameControl = {
			run: function() {
				this.interval = setInterval(updateGameArea, 0.1);
			},
			clear: function() {
				context.clearRect(0, 0, this.width, this.height);
			}
		}

		function updateGameArea()
		{
			// gameControl.clear();
			// context.fillStyle = 'black';
			// context.fillRect(0, 0, width, height);

			particles.map(function(particle){
				particle.update();
				particle.draw();
			});
		}

		function startGame() {
			particles = [];

			gameControl.run();
			for(var i = 0; i < 100; i++) {
				let posX = (width / 2) + Math.floor((Math.random() - 0.5) * width);
				let posY = (height / 2) + Math.floor((Math.random() - 0.5) * width);
				particles[i] = new particle(posX, posY);
			}
		}

		startGame();

	}

})();