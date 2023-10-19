    // Define an array of dark colors
    const darkColors = [
        '#1a1a1a', // Black
        '#333333', // Dark Gray
        '#4a4a4a', // Darker Gray
        '#555555', // Dark Gray
        '#666666', // Gray
        '#777777', // Light Gray
        '#888888', // Light Gray
        '#999999', // Light Gray
        '#aaaaaa', // Light Gray
      ];

export function getRandomDarkColor() {

    // Choose a random index from the array
    const randomIndex = Math.floor(Math.random() * darkColors.length);
  
    // Get the random color based on the random index
    const randomColor = darkColors[randomIndex];
  
    return randomColor;
  }