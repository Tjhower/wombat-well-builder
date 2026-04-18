document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  //Load Title
  let titleReady = false;
  const titleImage = new Image();
  
  /*titleImage.onload = () => {
    console.log("Image Loaded!");
    titleReady = true;
  };
  titleImage.onerror = () => {
    console.error("Image failed to load!");
  };
  titleImage.src = "img/wombat-well-builder-title.svg";

  //Play Button Setup
  let playReady = false;
  const playButton = new Image();

  playButton.onload = () => {
    console.log("Play button image loaded!");
    playReady = true;
  };
  playButton.onerror = () => {
    console.error("Play button image failed to load!");
  };
  playButton.src = "img/play-button.svg";*/

  const assets = new AssetLoader();
  const player = new Player(assets);
  assets.loadImage("title", "img/wombat-well-builder-title.svg");
  assets.loadImage("play", "img/play-button.svg");

  assets.loadImage("player_idle", "img/player-idle.png");
  assets.loadImage("player_run", "img/player-run.png");
  assets.loadImage("player_jump", "img/player-jump.png");
  
  assets.loadImage("bg_far", "img/bg-far.png");
  assets.loadImage("bg_mid", "img/bg-mid.png");
  assets.loadImage("bg_near", "img/bg-near.png");

  //Start Game on Click
  canvas.addEventListener("click", () => {
    if (gameState === "title"){
      setState("running");
    }
  });
  // =========================
  // INPUT
  // =========================
  document.body.addEventListener("keydown", (e) => {
    if (gameState === "running") {
      if (e.code === "Space") {
        player.jump();
      }
    }
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    handleClick(mx, my);
  });

  // =========================
  // GAME LOOP
  // =========================
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "title") {
    player.update(); // allows idle animation
    player.draw(ctx);
    drawTitle(ctx, canvas);
    }

    if (gameState === "running") {
      player.update();
      updateMap(player);

      drawMap(ctx, canvas);
      player.draw(ctx);
    }

    if (gameState === "gameover") {
      ctx.fillStyle = "black";
      ctx.font = "60px monospace";
      ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
    }

    requestAnimationFrame(gameLoop);
  }

  function drawTitle() {
    if (titleReady) {
      const imgRatio = titleImage.width / titleImage.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(titleImage, x, y, drawWidth, drawHeight);
    }
    // Draw play button
    const imgRatio = playButton.width / playButton.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight;
    if (imgRatio > canvasRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
    }
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2 + 100; // Position below title
    ctx.drawImage(playButton, x, y, drawWidth, drawHeight);
  }

  gameLoop();
});