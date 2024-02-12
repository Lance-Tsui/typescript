
export function getRandomColor() {
    // helper function
    // Generate a random hue, full saturation, and lightness at 50% for vibrant colors
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

export function getHueFromHSL(color: string) {

    const match = color.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return null;
  }
  