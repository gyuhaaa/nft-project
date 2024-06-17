import { Flex } from "@chakra-ui/react";
import { FC } from "react";

const My: FC = () => {
  return (
    <Flex flexDir={"column"}>
      <Flex>My Rank</Flex>
      <Flex>진행도</Flex>
    </Flex>
  );
};

export default My;
