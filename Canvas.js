var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
context.fillStyle = 'black';
context.fillRect(0, 0, width, height);
context.translate(
    Math.floor(width/2),
    Math.floor(height/2)
);

function clearCanvas() {
    context.fillStyle = "rgba(0, 0, 0, 0.1)"; // Creates trajectory motion blur
    context.fillRect(-width, -height, 2 * width, 2 * height);
}