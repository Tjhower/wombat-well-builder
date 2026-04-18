const groundY = 880;

let obstacles = [];

function spawnObstacle() {
  obstacles.push({
    x: 2000,
    y: 820,
    width: 60,
    height: 60,
  });
}

let spawnTimer = 0;

function updateMap(player) {
  spawnTimer++;

  if (spawnTimer > 90) {
    spawnObstacle();
    spawnTimer = 0;
  }

  obstacles.forEach((obs) => {
    obs.x -= 10;

    // Collision
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameState = "gameover";
    }
  });

  obstacles = obstacles.filter((o) => o.x > -100);
}

function drawMap(ctx, canvas) {
  // Ground
  ctx.fillStyle = "#444";
  ctx.fillRect(0, groundY, canvas.width, 200);

  // Obstacles
  ctx.fillStyle = "red";
  obstacles.forEach((obs) => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function resetGame() {
  obstacles = [];
}