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
  const [isGameFinished, _setIsGameFinished] = useState<boolean>(false);
  const [isNeedToResetTimer, setIsNeedToResetTImer] = useState<boolean>(false);
  const [words, _setWords] = useState<string[]>([]);
  const [typingIndex, _setTypingIndex] = useState<number>(0);
  const [wordsValidation, _setWordsValidation] = useState<WordsValidate>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const typingIndexRef = useRef<number>(typingIndex);
  const wordsRef = useRef<string[]>(words);
  const wordsValidationRef = useRef<WordsValidate>(wordsValidation);
  const isGameFinishedRef = useRef<boolean>(isGameFinished);

  useEffect(() => {
    setNewWordsList();
    resetInput();
    window.addEventListener("keydown", onKeyDown);
  }, []);

  const onKeyDown = (event: any): void => {
    if (isGameFinishedRef.current) return;
    if (!isTypingStarted) {
      setIsTypingStarted(true);
      setIsNeedToResetTImer(false);
    }

    if (event.keyCode === 32 && inputRef.current) {
      // space pressed
      event.preventDefault();
      validateWord(inputRef.current.value);
      setTypingIndexRef(typingIndexRef.current + 1);
      inputRef.current.value = "";
    } else if (
      event.keyCode === 8 &&
      inputRef.current &&
      inputRef.current.value === ""
    ) {
      // backspace pressed
      event.preventDefault();
      setTypingIndexRef(typingIndexRef.current - 1);
      inputRef.current.value =
        wordsValidationRef.current[
          wordsRef.current[typingIndexRef.current]
        ].typed;
    }
  };

  const setTypingIndexRef = (index: number) => {
    typingIndexRef.current = index;
    _setTypingIndex(index);
  };

  const setWordsRef = (allWords: string[]) => {
    wordsRef.current = allWords;
    _setWords(allWords);
  };

  const setWordValidationsRef = (validation: WordsValidate) => {
    wordsValidationRef.current = validation;
    _setWordsValidation(validation);
  };

  const setIsGameFinishedRef = (isFinish: boolean) => {
    isGameFinishedRef.current = isFinish;
    _setIsGameFinished(isFinish);
  };

  const initialProps = (): void => {
    setNewWordsList();
    setTypingIndexRef(0);
    setWordValidationsRef({});
    setIsTypingStarted(false);
    setIsGameFinishedRef(false);
  };

  const setNewWordsList = (): void => {
    const randomWordsList: string[] = getRandomWordsList();
    setWordsRef(randomWordsList);
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
      inputValue !== wordsRef.current[typingIndexRef.current];
    setWordValidationsRef({
      ...wordsValidationRef.current,
      [wordsRef.current[typingIndexRef.current]]: {
        original: wordsRef.current[typingIndexRef.current],
        typed: inputValue,
        validate: isWrong ? WordStates.TYPED_WRONG : WordStates.TYPED_CORRECTLY,
      },
    });
  };

  const finishGame = (): void => {
    if (inputRef.current !== null) {
      inputRef.current.disabled = true;
    }
    setIsGameFinishedRef(true);
  };

  const resetGame = (): void => {
    setIsNeedToResetTImer(true);
    resetInput();
    initialProps();
  };

  return (
    <Container className="game-section">
      <ExplainSection>
        {isTypingStarted ? Messages.GO : Messages.EXPLAIN}
      </ExplainSection>
      <Timer
        isTypingStarted={isTypingStarted}
        finishGame={finishGame}
        isNeedToResetTimer={isNeedToResetTimer}
      />
      <TypingInput ref={inputRef} />
      <WordsContainer>
        {isGameFinished ? (
          <Results wordsValidation={wordsValidation} resetGame={resetGame} />
        ) : (
          words.map((word: string, index: number) => (
            <WordChip
              key={index}
              className={`word-chip ${getWordState(index, typingIndex)} ${
                wordsValidation.hasOwnProperty(word)
                  ? wordsValidation[word].validate
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
