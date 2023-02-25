import React, { useState, useEffect } from "react";

interface TimerProps {
    seconds: number;
    onFinish: Function
}
function Timer({ seconds, onFinish }:TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) onFinish();

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <div>{timeLeft} seconds left</div>;
}

export default Timer;