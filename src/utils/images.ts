import goodStorage from 'good-storage';

export default class Images {
  static images: Record<string, string> = {};

  static loadAll() {
    Images.images = goodStorage.get('images', {});
    if (Images.isEmpty()) {
      Images.requestImages();
    }
  }

  static isEmpty(): boolean {
    return !Images.images || Object.keys(Images.images).length === 0;
  }

  static requestImages() {
    /**
     * Using `import.meta.glob()` with `{ eager: true }`:
     *
     * - Vite replaces this call at build time with multiple static `import` statements
     *   for all files matching the glob pattern.
     *
     * - In this case, it matches all image files (png, jpg, jpeg, gif, svg) recursively
     *   under the ../assets/img/ directory.
     *
     * - The result is an object where each key is a file path, and the value is a module
     *   with a `default` export containing the URL to the asset.
     *
     * - At runtime, the browser makes HTTP requests for these image files (if not cached)
     *   and stores them in the module + HTTP cache.
     *
     * - This technique is useful for automatically importing and referencing multiple assets
     *   without writing repetitive import statements.
     */

    const imgMap = import.meta.glob('../assets/img/**/*.{png,jpg,jpeg,gif,svg}', { eager: true });
    for (const imagePath in imgMap) {
      const imageFilename: string = imagePath.split('/').pop() || '';
      Images.images[imageFilename] = (imgMap[imagePath] as { default: string }).default;
    }
    goodStorage.set('images', Images.images);
  }

  static getImage(name: string): string {
    Images.loadAll(); // Ensure images are loaded
    return Images.images[name] || '';
  }
}
