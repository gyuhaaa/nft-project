import { Flex } from "@chakra-ui/react";
import { FC } from "react";

const My: FC = () => {
  return (
    <Flex flexDir={"column"}>
      <Flex>My Rank</Flex>
      <Flex>내가 올린 문제(Card, 승인여부)</Flex>
    </Flex>
  );
};

export default My;
