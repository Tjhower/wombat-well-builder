class ParallaxLayer {
  constructor(image, speed) {
    this.image = image;
    this.speed = speed;
    this.x = 0;
  }

  update(playerSpeed) {
    this.x -= playerSpeed * this.speed;

    if (this.x <= -this.image.width) {
      this.x = 0;
    }
  }

  draw(ctx, canvas) {
    const img = this.image;

    ctx.drawImage(img, this.x, 0, canvas.width, canvas.height);
    ctx.drawImage(img, this.x + canvas.width, 0, canvas.width, canvas.height);
  }
}