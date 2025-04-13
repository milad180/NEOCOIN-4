const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const mario = {
  x: 50,
  y: 460,
  w: 30,
  h: 30,
  dy: 0,
  onGround: true,
  frame: 0
};

const barrelImg = new Image();
barrelImg.src = "assets/barrel.png";
const marioRun = [new Image(), new Image()];
marioRun[0].src = "assets/mario1.png";
marioRun[1].src = "assets/mario2.png";

const bgm = new Audio("assets/bgm.ogg");
bgm.loop = true; bgm.volume = 0.4;

const deathSound = new Audio("assets/death.ogg");
const jumpSound = new Audio("assets/jump.ogg");

let barrels = [];
let gravity = 1;
let score = 0;
let frameCount = 0;

function drawPlatform() {
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 490, canvas.width, 10);
}

function drawMario() {
  ctx.drawImage(marioRun[mario.frame % 2], mario.x, mario.y, mario.w, mario.h);
}

function drawBarrels() {
  barrels.forEach(b => {
    ctx.save();
    ctx.translate(b.x + 15, b.y + 15);
    ctx.rotate(b.angle);
    ctx.drawImage(barrelImg, -15, -15, 30, 30);
    ctx.restore();
    b.x -= 2;
    b.angle += 0.1;
  });
}

function updateMario() {
  mario.y += mario.dy;
  if (mario.y + mario.h >= 490) {
    mario.y = 460;
    mario.dy = 0;
    mario.onGround = true;
  } else {
    mario.dy += gravity;
  }
}

function moveLeft() {
  mario.x -= 10;
  mario.frame++;
}
function moveRight() {
  mario.x += 10;
  mario.frame++;
}
function jump() {
  if (mario.onGround) {
    mario.dy = -15;
    mario.onGround = false;
    jumpSound.play();
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowUp") jump();
});

function checkCollision() {
  barrels.forEach(b => {
    if (mario.x < b.x + 30 && mario.x + mario.w > b.x &&
        mario.y < b.y + 30 && mario.y + mario.h > b.y) {
      deathSound.play();
      alert("Game Over! Final Score: " + score);
      location.reload();
    }
  });
}

function updateScore() {
  score++;
  scoreDisplay.textContent = "Score: " + score;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatform();
  drawMario();
  drawBarrels();
  updateMario();
  checkCollision();
  updateScore();
  frameCount++;
  requestAnimationFrame(gameLoop);
}

setInterval(() => barrels.push({ x: 480, y: 460, angle: 0 }), 4000);
setTimeout(() => { bgm.play(); gameLoop(); }, 500);
