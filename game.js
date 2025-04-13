const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let pacman = { x: 50, y: 50, size: 20, dx: 20, dy: 0 };

function drawPacman() {
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(pacman.x, pacman.y);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  clearCanvas();
  drawPacman();
  pacman.x += pacman.dx;
  pacman.y += pacman.dy;

  if (pacman.x > canvas.width) pacman.x = 0;
  if (pacman.x < 0) pacman.x = canvas.width;
  if (pacman.y > canvas.height) pacman.y = 0;
  if (pacman.y < 0) pacman.y = canvas.height;

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    pacman.dx = 20;
    pacman.dy = 0;
  } else if (e.key === "ArrowLeft") {
    pacman.dx = -20;
    pacman.dy = 0;
  } else if (e.key === "ArrowUp") {
    pacman.dx = 0;
    pacman.dy = -20;
  } else if (e.key === "ArrowDown") {
    pacman.dx = 0;
    pacman.dy = 20;
  }
});

update();
