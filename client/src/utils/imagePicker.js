// Define an array of campaign images
const campaignImages = [
    'Apocalypse-Setting-1.png',
    'Castle-1.png',
    'Castle-2.png',
    'Cyberpunk-Setting-1.png',
    'Cyberpunk-Setting-2.png',
    'Dungeon-Setting-1.png',
    'Floating-Islands-Setting-1.png',
    'Flying-Cars-Setting-1.png',
    'Flying-Cars-Setting-2.png',
    'Forest-Setting-1.png',
    'Forest-Setting-1.png',
    'Jungle-Setting-1.png',
    'Jungle-Setting-2.png',
    'Medieval-City-1.png',
    'Medieval-Table-Setting.png',
    'Mountain-Setting-1.png',
    'Mountain-Setting-2.png',
    'Mountain-Setting-3.png',
    'Mountain-Setting-4.png',
    'Night-Setting-1.png',
    'Snow-Biome-1.png',
    'Town-Setting-1.png',
    'Western-Setting-1.png'
  ];

  const usedImageIndices = new Set();

  // Define the function to get a random campaign image
export function getRandomCampaignImage() {
  if (usedImageIndices.size === campaignImages.length) {
    // All images have been used; reset the used indices set
    usedImageIndices.clear();
  }

  let randomIndex;
  do {
    // Pick a random index from the campaignImages array
    randomIndex = Math.floor(Math.random() * campaignImages.length);
  } while (usedImageIndices.has(randomIndex));

  // Add the used index to the set to avoid reuse
  usedImageIndices.add(randomIndex);

  // Return the filename directly
  return `Campaign-Images/${campaignImages[randomIndex]}`;
}