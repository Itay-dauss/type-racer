import { WordsBack } from "./WordsBank";
import { WordStates } from "./WordStates";

export const getRandomWordsList = (): string[] => {
  const randomWordsList: string[] = WordsBack.sort(() => {
    return Math.random() - 0.5;
  });

  return randomWordsList;
};

export const getWordState = (
  wordIndex: Number,
  typingIndex: Number
): string => {
  if (wordIndex === typingIndex) return WordStates.CURRENTLY_TYPING;
  else if (wordIndex < typingIndex) return WordStates.TYPED;
  else return WordStates.NOT_TYPED;
};
