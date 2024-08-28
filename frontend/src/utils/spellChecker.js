import Typo from "typo-js";

// Load the Typo.js dictionary
const dictionary = new Typo("en_US");

export const correctSpelling = (text) => {
  const words = text.split(" ");
  const correctedWords = words.map((word) => {
    if (dictionary.check(word)) {
      return word;
    } else {
      const suggestions = dictionary.suggest(word);
      return suggestions.length > 0 ? suggestions[0] : word;
    }
  });
  return correctedWords.join(" ");
};
