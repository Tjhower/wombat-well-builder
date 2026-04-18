class Player {
  constructor(assets) {
    this.assets = assets;

    this.x = 200;
    this.y = 800;
    this.width = 96;
    this.height = 96;

    // Physics
    this.velocityY = 0;
    this.gravity = 1.2;
    this.jumpPower = -20;
    this.grounded = true;

    // =========================
    // ANIMATION SETUP
    // =========================
    this.animations = {
        idle: {
            image: this.assets.get("player_idle"),
            frames: 4,
            speed: 10,
        },
        run: {
            image: this.assets.get("player_run"),
            frames: 6,
            speed: 6,
        },
        jump: {
            image: this.assets.get("player_jump"),
            frames: 1,
            speed: 1,
        },
        };

    this.animations.idle.image.src = "img/player-idle.png";
    this.animations.run.image.src = "img/player-run.png";
    this.animations.jump.image.src = "img/player-jump.png";

    this.currentAnim = "idle";
    this.frameIndex = 0;
    this.frameTimer = 0;
  }

  // =========================
  // UPDATE
  // =========================
  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    // Ground collision
    if (this.y >= 800) {
      this.y = 800;
      this.velocityY = 0;
      this.grounded = true;
    }

    // =========================
    // ANIMATION STATE SWITCH
    // =========================
    if (!this.grounded) {
      this.setAnimation("jump");
    } else if (gameState === "running") {
      this.setAnimation("run");
    } else {
      this.setAnimation("idle");
    }

    this.updateAnimation();
  }

  jump() {
    if (this.grounded) {
      this.velocityY = this.jumpPower;
      this.grounded = false;
    }
  }

  // =========================
  // ANIMATION LOGIC
  // =========================
  setAnimation(name) {
    if (this.currentAnim !== name) {
      this.currentAnim = name;
      this.frameIndex = 0;
      this.frameTimer = 0;
    }
  }

  updateAnimation() {
    const anim = this.animations[this.currentAnim];

    this.frameTimer++;
    if (this.frameTimer >= anim.speed) {
      this.frameTimer = 0;
      this.frameIndex++;

      if (this.frameIndex >= anim.frames) {
        this.frameIndex = 0;
      }
    }
  }

  // =========================
  // DRAW SPRITE
  // =========================
  draw(ctx) {
    const anim = this.animations[this.currentAnim];
    const img = anim.image;

    if (!img.complete) return;

    const frameWidth = img.width / anim.frames;
    const frameHeight = img.height;
    ctx.save();

    //Slight Forward Lean 
    if (this.currentAnim === "run") {
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(-0.05);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.drawImage(
        img,
        this.frameIndex * frameWidth,
        0,
        frameWidth,
        frameHeight,
        0,
        0,
        this.width,
        this.height
    );
    } else {
    ctx.drawImage(
        img,
        this.frameIndex * frameWidth,
        0,
        frameWidth,
        frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
    );
}
ctx.restore();

  }
}