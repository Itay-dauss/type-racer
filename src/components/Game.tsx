import { useState, useEffect, useRef } from "react";
import {
  Container,
  ExplainSection,
  WordsContainer,
  WordChip,
  TypingInput,
} from "../styles/Game";
import Timer from "./Timer";
import Results from "./Results";
import { getRandomWordsList, getWordState } from "../utils/LogicFunctions";
import { WordStates } from "../utils/WordStates";
import { WordsValidate } from "../types/WordsValidate";
import * as Messages from "../utils/Messages";

function Game() {
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [isNeedToResetTimer, setIsNeedToResetTImer] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const typingIndex = useRef<number>(0);
  const wordsList = useRef<string[]>([]);
  const wordsValidation = useRef<WordsValidate>({});
  const isGameFinished = useRef<boolean>(false);

  useEffect(() => {
    setNewWordsList();
    resetInput();
    window.addEventListener("keydown", onKeyDown);
  }, []);

  const onKeyDown = (event: any): void => {
    if (isGameFinished.current) return;
    if (!isTypingStarted) {
      setIsTypingStarted(true);
      setIsNeedToResetTImer(false);
    }

    if (event.keyCode === 32 && inputRef.current) {
      // space pressed
      event.preventDefault();
      validateWord(inputRef.current.value);
      typingIndex.current = typingIndex.current + 1;
      inputRef.current.value = "";
    } else if (
      event.keyCode === 8 &&
      inputRef.current &&
      inputRef.current.value === ""
    ) {
      // backspace pressed
      event.preventDefault();
      typingIndex.current = typingIndex.current - 1;
      inputRef.current.value =
        wordsValidation.current[wordsList.current[typingIndex.current]].typed;
    }
  };

  const initialProps = (): void => {
    setNewWordsList();
    typingIndex.current = 0;
    wordsValidation.current = {};
    setIsTypingStarted(false);
    isGameFinished.current = false;
  };

  const setNewWordsList = (): void => {
    const randomWordsList: string[] = getRandomWordsList();
    wordsList.current = randomWordsList;
  };

  const resetInput = (): void => {
    if (inputRef.current !== null) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  };

  const validateWord = (inputValue: string) => {
    const isWrong: boolean =
      inputValue !== wordsList.current[typingIndex.current];
    wordsValidation.current = {
      ...wordsValidation.current,
      [wordsList.current[typingIndex.current]]: {
        original: wordsList.current[typingIndex.current],
        typed: inputValue,
        validate: isWrong ? WordStates.TYPED_WRONG : WordStates.TYPED_CORRECTLY,
      },
    };
  };

  const finishGame = (): void => {
    if (inputRef.current !== null) {
      inputRef.current.disabled = true;
    }
    isGameFinished.current = true;
  };

  const resetGame = (): void => {
    setIsNeedToResetTImer(true);
    resetInput();
    initialProps();
  };

  return (
    <Container className="game-section">
      <ExplainSection>{Messages.EXPLAIN}</ExplainSection>
      <Timer
        isTypingStarted={isTypingStarted}
        finishGame={finishGame}
        isNeedToResetTimer={isNeedToResetTimer}
      />
      <TypingInput ref={inputRef} />
      <WordsContainer>
        {isGameFinished.current ? (
          <Results
            wordsValidation={wordsValidation.current}
            resetGame={resetGame}
          />
        ) : (
          wordsList.current.map((word: string, index: number) => (
            <WordChip
              key={index}
              className={`word-chip ${getWordState(
                index,
                typingIndex.current
              )} ${
                wordsValidation.current.hasOwnProperty(word)
                  ? wordsValidation.current[word].validate
                  : ""
              }`}
            >
              {word}
            </WordChip>
          ))
        )}
      </WordsContainer>
    </Container>
  );
}

export default Game;
