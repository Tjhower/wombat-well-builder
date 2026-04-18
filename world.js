class World {
  constructor(assets) {
    this.layers = [];

    this.layers.push(
      new ParallaxLayer(assets.get("bg_far"), 0.2),
      new ParallaxLayer(assets.get("bg_mid"), 0.5),
      new ParallaxLayer(assets.get("bg_near"), 0.8)
    );
  }

  update(playerSpeed) {
    for (let layer of this.layers) {
      layer.update(playerSpeed);
    }
  }

  draw(ctx, canvas) {
    for (let layer of this.layers) {
      layer.draw(ctx, canvas);
    }
  }
}