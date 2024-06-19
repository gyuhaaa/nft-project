import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import quizData from "../../public/json/imgData.json";
import { Timer } from "../components/Timer";

const Game: FC = () => {
  const [timer, setTimer] = useState<boolean>(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [quizNumber, setQuizNumber] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<string>();
  const [successNumber, setSuccessNumber] = useState<number>(0);
  const [failNumber, setFailNumber] = useState<number>(0);

  const onClickSubmit = () => {
    setIsSubmit(true);
    if (quizAnswer === quizData[quizNumber].answer) {
      // 정답
      setSuccessNumber(successNumber + 1);
      console.log(successNumber);
    } else {
      // 땡!
      setFailNumber(failNumber + 1);
      console.log(failNumber);
    }
  };

  const onClickNext = () => {
    try {
      if (quizNumber + 1 === quizData.length) {
        setIsEnd(true);
      } else {
        setQuizNumber(quizNumber + 1);
        setIsSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("quiz : " + quizNumber);
  }, [quizNumber]);
  useEffect(() => {
    console.log("isEnd : " + isEnd);
  }, [isEnd]);

  return (
    <Flex
      w={"100%"}
      h={"80vh"}
      // justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      <Flex
        w={500}
        h={500}
        mt={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {showStartButton && (
          <Box
            onClick={() => {
              setShowStartButton(false);
              setTimer(true);
            }}
            w={200}
            h={100}
            fontSize={50}
            fontWeight={"semibold"}
            bgColor={"gray.100"}
            boxShadow={"xl"}
            rounded={"md"}
            textAlign={"center"}
            alignContent={"center"}
          >
            시작
          </Box>
        )}
        {timer && <Timer setTimer={setTimer} />}
        {!timer && !showStartButton && (
          <Flex
            bgColor={"blue.100"}
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {!isSubmit && <Image src={quizData[quizNumber].questionImage} />}
            {isSubmit && !isEnd && (
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <Text fontSize={30} fontWeight={"bold"}>
                  정 답 은 ?
                </Text>
                <Image w={300} src={quizData[quizNumber].answerImage} />
                <Text fontSize={20} fontWeight={"semibold"}>
                  {quizData[quizNumber].answer}
                </Text>
                <Text>{quizData[quizNumber].description}</Text>
              </Flex>
            )}
            {isEnd && (
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <Text fontSize={100} fontWeight={"bold"}>
                  끝
                </Text>
                <Text fontSize={20} fontWeight={"semibold"}>
                  맞춘 문제 : {successNumber} 개
                </Text>
                <Text fontSize={20} fontWeight={"semibold"}>
                  틀린 문제 : {failNumber} 개
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
      {!timer && !showStartButton && (
        <Flex w={500} mt={10} flexDir={"column"} gap={2}>
          {!isSubmit && (
            <>
              <Text>▼ 정답은 여기에</Text>
              <Input
                type="text"
                h={50}
                onChange={(e) => setQuizAnswer(e.target.value)}
              />
              <Button onClick={onClickSubmit}>제출</Button>
            </>
          )}
          {isSubmit && !isEnd && (
            <Button onClick={onClickNext}>다음 문제</Button>
          )}
          {isEnd && (
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              처음으로
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Game;
