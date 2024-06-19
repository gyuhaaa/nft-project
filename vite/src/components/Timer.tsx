import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface TimerProps {
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Timer: FC<TimerProps> = ({ setTimer }) => {
  const MINUTES_IN_MS = 5 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const second = String(Math.floor((timeLeft / 1000) % 60));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      setTimer(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <Flex fontSize={100} fontWeight={"bold"}>
      {second}
    </Flex>
  );
};
