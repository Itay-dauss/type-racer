import React, { useState, useEffect } from "react";
import { Container, Seconds } from "../styles/Timer";

function Timer() {
  const [seconds, setSeconds] = useState(6);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = (): void => {
    setIsActive(false);
    setSeconds(60);
  };

  useEffect(() => {
    if (seconds === 0) {
      resetTimer();
      return;
    }

    isActive && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds, isActive]);

  return (
    <Container>
      <Seconds>
        {isActive ? seconds : `${seconds} seconds on the clock!`}
      </Seconds>
    </Container>
  );
}

export default Timer;
