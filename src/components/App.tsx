import React, { useState } from "react";
import Game from "./Game";
import Intro from "./Intro";
import { Container, Title, StartButton } from "../styles/App";
import * as Messages from "../utils/Messages";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<Boolean>(false);

  return (
    <Container className="app">
      <Title>{Messages.WELCOME}</Title>
      {!isGameStarted ? (
        <React.Fragment>
          <Intro />
          <StartButton onClick={() => setIsGameStarted(true)}>
            {Messages.START_GAME}
          </StartButton>
        </React.Fragment>
      ) : (
        <Game />
      )}
    </Container>
  );
}

export default App;
