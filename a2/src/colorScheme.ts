
export function getRandomColor() {
    // helper function
    // Generate a random hue, full saturation, and lightness at 50% for vibrant colors
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

