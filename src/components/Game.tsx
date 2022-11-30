import React, { useState, useEffect, useRef } from "react";
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

function Game() {
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [words, _setWords] = useState<string[]>([]);
  const [typingIndex, _setTypingIndex] = useState<number>(0);
  const [wordsValidation, _setWordsValidation] = useState<WordsValidate>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const typingIndexRef = useRef<number>(typingIndex);
  const wordsRef = useRef<string[]>(words);
  const wordsValidationRef = useRef<WordsValidate>(wordsValidation);

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

    console.log(wordsValidationRef.current);
  };

  const onKeyDown = (event: any): void => {
    if (!isTypingStarted) setIsTypingStarted(true);

    if (event.keyCode == 32 && inputRef.current) {
      // space pressed
      event.preventDefault();
      validateWord(inputRef.current.value);
      setTypingIndexRef(typingIndexRef.current + 1);
      inputRef.current.value = "";
    } else if (
      event.keyCode == 8 &&
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

  useEffect(() => {
    const randomWordsList: string[] = getRandomWordsList();
    setWordsRef(randomWordsList);
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
    window.addEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    console.log("Updated!");
    console.log(typingIndex);
  }, [typingIndex]);

  return (
    <Container className="game-section">
      <ExplainSection>
        As soon as you start typing the clock will start running
      </ExplainSection>
      <Timer
        isTypingStarted={isTypingStarted}
        finishGame={() => setIsGameFinished(true)}
      />
      <TypingInput ref={inputRef} />
      <WordsContainer>
        {isGameFinished ? (
          <Results wordsValidation={wordsValidation} />
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
