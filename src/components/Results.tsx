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

function Results(props: { wordsValidation: WordsValidate; resetGame: any }) {
  const { wordsValidation, resetGame } = props;

  const [amountOfWords, setAmountOfWords] = useState<number>(0);
  const [amountOfMistakes, setAmountOfMistakes] = useState<number>(0);
  const [mistakes, setMistakes] = useState<WordResult[]>([]);

  useEffect(() => {
    const wordsResults: WordResult[] = Object.values(wordsValidation);
    setAmountOfWords(wordsResults.length);
    const wrongTypedWords: WordResult[] = wordsResults.filter(
      (result) => result.validate === WordStates.TYPED_WRONG
    );
    setMistakes(wrongTypedWords);
    setAmountOfMistakes(wrongTypedWords.length);
  }, []);

  return (
    <Container>
      <Score>{`Your score is: ${amountOfWords - amountOfMistakes} WPM!`}</Score>
      {amountOfMistakes === 0 ? (
        <React.Fragment>
          <PerfectScore>You type Perfectly!</PerfectScore>
          <StarsEyesEmoji src={IMG} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ScoreDetails>{`In reality, you typed ${amountOfWords} WPM, but you made ${amountOfMistakes} mistakes, which were not counted in the corrected scores.`}</ScoreDetails>
          <MistakesContainer>
            {mistakes.map((wordData) => (
              <MistakeDetails>{`Instead of "${wordData.original}", you typed "${wordData.typed}".
`}</MistakeDetails>
            ))}
          </MistakesContainer>
        </React.Fragment>
      )}
      <PlayAgainButton onClick={resetGame}>Play Again!</PlayAgainButton>
    </Container>
  );
}

export default Results;
