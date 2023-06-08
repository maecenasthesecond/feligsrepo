export function shuffleArray(array) {
  // Kopie des Arrays erstellen
  const shuffledArray = array.slice();

  // Fisher-Yates-Algorithmus anwenden
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
