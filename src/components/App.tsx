import React, { useState, useEffect } from "react";
import Game from "./Game";
import Intro from "./Intro";
import { Container, Title, StartButton } from "../styles/App";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<Boolean>(false);

  return (
    <Container className="app">
      <Title>Welcome to Type Racer!</Title>
      {!isGameStarted ? (
        <React.Fragment>
          <Intro />
          <StartButton onClick={() => setIsGameStarted(true)}>
            Start Typing!
          </StartButton>
        </React.Fragment>
      ) : (
        <Game />
      )}
    </Container>
  );
}

export default App;
