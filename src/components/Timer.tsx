import { useState, useEffect } from "react";
import { Container, Seconds } from "../styles/Timer";
import * as Messages from "../utils/Messages";

function Timer(props: {
  isTypingStarted: boolean;
  finishGame: any;
  isNeedToResetTimer: boolean;
}) {
  const { isTypingStarted, finishGame, isNeedToResetTimer } = props;

  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isTimeIsUp, setIsTimeIsUp] = useState(false);

  const resetTimer = (): void => {
    setIsTimeIsUp(false);
    setIsActive(false);
    setSeconds(5);
  };

  useEffect(() => {
    if (isNeedToResetTimer) resetTimer();

    isTypingStarted && !isActive && setIsActive(true);

    if (seconds === 0 && isTypingStarted) {
      setIsActive(false);
      setIsTimeIsUp(true);
      finishGame();
      return;
    }

    isActive && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds, isActive, isTypingStarted, finishGame, isNeedToResetTimer]);

  return (
    <Container>
      <Seconds>
        {isActive
          ? seconds
          : isTimeIsUp
          ? Messages.TIME_IS_UP
          : Messages.TIME_IS_SET(seconds)}
      </Seconds>
    </Container>
  );
}

export default Timer;
