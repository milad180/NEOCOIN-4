const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(280, 310, 30, 0.2 * Math.PI, 1.8 * Math.PI);
ctx.lineTo(280, 310);
ctx.fill();