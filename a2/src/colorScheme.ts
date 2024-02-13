
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

export function isHueStringValid(hueString: string) {
  if (/^\d+$/.test(hueString)) {
    const hue = parseInt(hueString, 10);
    return hue >= 0 && hue <= 360;
  }
  return false;
}

  
export function getFixedColor(color: string) {
    // helper function
    // Generate a random hue, full saturation, and lightness at 50% for vibrant colors
    var hue = color;
    if (!hue) {
      hue = "0";
    }
    return `hsl(${hue}, 100%, 50%)`;
}