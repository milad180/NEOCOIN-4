const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 220, y: 600, w: 40, h: 20, bullets: [] };
const enemies = [];
let level = 1;

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawBullets() {
  ctx.fillStyle = "cyan";
  player.bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x, b.y, 4, 10);
    if (b.y < 0) player.bullets.splice(i, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach(e => {
    e.y += 0.3;
    ctx.fillRect(e.x, e.y, e.w, e.h);
  });
}

function detectHits() {
  player.bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (b.x < e.x + e.w && b.x + 4 > e.x && b.y < e.y + e.h && b.y + 10 > e.y) {
        player.bullets.splice(bi, 1);
        enemies.splice(ei, 1);
      }
    });
  });
}

function updateLevel() {
  if (enemies.length === 0) {
    level++;
    spawnEnemies();
  }
}

function spawnEnemies() {
  for (let i = 0; i < 5 + level; i++) {
    enemies.push({ x: 50 + (i % 5) * 80, y: 30 + Math.floor(i / 5) * 40, w: 30, h: 20 });
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === "ArrowRight") player.x += 10;
  if (e.key === " ") {
    player.bullets.push({ x: player.x + player.w / 2 - 2, y: player.y });
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
  detectHits();
  updateLevel();
  requestAnimationFrame(gameLoop);
}

spawnEnemies();
gameLoop();