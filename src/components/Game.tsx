import React, { useState, useEffect } from "react";
import { Container, ExplainSection } from "../styles/Game";
import Timer from "./Timer";

function Game() {
  const [isTypingStarted, setIsTypingStarted] = useState(false);

  return (
    <Container className="game-section">
      <ExplainSection>
        As soon as you start typing the clock will start running
      </ExplainSection>
      <Timer />
    </Container>
  );
}

export default Game;
