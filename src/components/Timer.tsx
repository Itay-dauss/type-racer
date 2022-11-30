import React, { useState, useEffect } from "react";
import { Container, Seconds } from "../styles/Timer";

function Timer(props: { isTypingStarted: boolean; finishGame: any }) {
  const { isTypingStarted, finishGame } = props;

  const [seconds, setSeconds] = useState(6);
  const [isActive, setIsActive] = useState(false);
  const [isTimeIsUp, setIsTimeIsUp] = useState(false);

  const resetTimer = (): void => {
    setIsTimeIsUp(false);
    setIsActive(false);
    setSeconds(60);
  };

  useEffect(() => {
    isTypingStarted && !isActive && setIsActive(true);

    if (seconds === 0) {
      setIsActive(false);
      setIsTimeIsUp(true);
      finishGame();
      return;
    }

    isActive && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds, isActive, isTypingStarted, finishGame]);

  return (
    <Container>
      <Seconds>
        {isActive
          ? seconds
          : isTimeIsUp
          ? `Time is Up!`
          : `${seconds} seconds on the clock!`}
      </Seconds>
    </Container>
  );
}

export default Timer;
