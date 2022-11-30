// Main
export const WELCOME = "Welcome to Type Racer!";
export const EXPLAIN =
  "As soon as you start typing the clock will start running";
export const LOADING = "Loading";
export const GO = "GO!";

// Intro
export const INTRO_1 = "How fast are your fingers?";
export const INTRO_2 = "Do the 60 seconds typing test to find out!";
export const INTRO_3 =
  "Press the space bar after each word. At the end, you'll get your typing speed in WPM. Good luck!";

// Buttons
export const START_GAME = "Start Typing!";
export const PLAY_AGAIN = "Play Again";

// Timer
export const TIME_IS_SET = (seconds: number) =>
  `${seconds} seconds on the clock.`;
export const TIME_IS_UP = "Time is Up!";

// Results
export const SCORE = (score: number) => `Your score is: ${score} WPM.`;
export const SCORE_DETAILS = (
  amountOfWords: number,
  amountOfMistakes: number
) =>
  `In reality, you typed ${amountOfWords} WPM, but you made ${amountOfMistakes} mistakes, which were not counted in the corrected scores.`;
export const MISTAKE_DETAILS = (
  originalWord: string,
  typedWord: string
) => `Instead of "${originalWord}", you typed "${typedWord}".
`;
export const PERFECT_TYPING = "You type Perfectly!";
