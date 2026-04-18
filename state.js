// =========================
// GAME STATE
// =========================
let gameState = "title";

// =========================
// TITLE ASSETS
// =========================
let titleReady = false;
const titleImage = new Image();
titleImage.src = "img/title.svg";
titleImage.onload = () => (titleReady = true);

let playReady = false;
const playButton = new Image();
playButton.src = "img/play-button.svg";
playButton.onload = () => (playReady = true);

// =========================
// DRAW TITLE SCREEN
// =========================
function drawTitle(ctx, canvas) {
  // DRAW TITLE
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
    const y = (canvas.height - drawHeight) / 2 - 100;

    ctx.drawImage(titleImage, x, y, drawWidth, drawHeight);
  }

  // DRAW PLAY BUTTON
  if (playReady) {
    const width = 300;
    const height = 120;

    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 + 100;

    ctx.drawImage(playButton, x, y, width, height);

    // Store button bounds for click detection
    playButton.bounds = { x, y, width, height };
  }
}

// =========================
// INPUT HANDLING
// =========================
function handleClick(mx, my) {
  if (gameState === "title" && playButton.bounds) {
    const b = playButton.bounds;

    if (
      mx >= b.x &&
      mx <= b.x + b.width &&
      my >= b.y &&
      my <= b.y + b.height
    ) {
      gameState = "running";
    }
  }

  if (gameState === "gameover") {
    resetGame();
    gameState = "running";
  }
}