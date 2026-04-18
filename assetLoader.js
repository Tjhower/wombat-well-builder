
class AssetLoader {
  constructor() {
    this.images = {};
    this.total = 0;
    this.loaded = 0;
  }

  loadImage(key, src) {
    this.total++;

    const img = new Image();

    img.onload = () => {
      this.loaded++;
    };

    img.onerror = () => {
      console.error(`Failed to load: ${src}`);
    };

    img.src = src;
    this.images[key] = img;
  }

  get(key) {
    return this.images[key];
  }

  isReady() {
    return this.loaded === this.total;
  }
}