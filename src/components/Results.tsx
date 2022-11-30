import React, { useState, useEffect } from "react";
import {
  Container,
  Score,
  ScoreDetails,
  MistakesContainer,
  MistakeDetails,
  PerfectScore,
  StarsEyesEmoji,
  PlayAgainButton,
} from "../styles/Results";
import { WordResult } from "../types/WordResult";
import { WordsValidate } from "../types/WordsValidate";
import { WordStates } from "../utils/WordStates";
import IMG from "../assets/star-eyes-emoji.png";
import * as Messages from "../utils/Messages";

function Results(props: { wordsValidation: WordsValidate; resetGame: any }) {
  const { wordsValidation, resetGame } = props;

  const [amountOfWords, setAmountOfWords] = useState<number>(0);
  const [amountOfMistakes, setAmountOfMistakes] = useState<number>(-1);
  const [mistakes, setMistakes] = useState<WordResult[]>([]);

  useEffect(() => {
    const wordsResults: WordResult[] = Object.values(wordsValidation);
    setAmountOfWords(wordsResults.length);
    const wrongTypedWords: WordResult[] = wordsResults.filter(
      (result) => result.validate === WordStates.TYPED_WRONG
    );
    setMistakes(wrongTypedWords);
    setAmountOfMistakes(wrongTypedWords.length);
  }, [wordsValidation]);

  return (
    <Container>
      {amountOfMistakes === -1 ? (
        <div>{Messages.LOADING}</div>
      ) : (
        <React.Fragment>
          <Score>{Messages.SCORE(amountOfWords - amountOfMistakes)}</Score>
          {amountOfMistakes === 0 ? (
            <React.Fragment>
              <PerfectScore>{Messages.PERFECT_TYPING}</PerfectScore>
              <StarsEyesEmoji src={IMG} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ScoreDetails>
                {Messages.SCORE_DETAILS(amountOfWords, amountOfMistakes)}
              </ScoreDetails>
              <MistakesContainer>
                {mistakes.map((wordData) => (
                  <MistakeDetails>
                    {Messages.MISTAKE_DETAILS(
                      wordData.original,
                      wordData.typed
                    )}
                  </MistakeDetails>
                ))}
              </MistakesContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      <PlayAgainButton onClick={resetGame}>
        {Messages.PLAY_AGAIN}
      </PlayAgainButton>
    </Container>
  );
}

export default Results;
