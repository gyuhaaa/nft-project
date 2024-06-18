import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC } from "react";
import MyQuestionCard from "../components/MyQuestionCard";
import { useMetamask } from "../lib";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const My: FC = () => {
  const { signer, setSigner } = useOutletContext<OutletContext>();

  return (
    <Flex flexDir={"column"}>
      {signer ? (
        <>
          <Flex>
            <Text mb={5} fontSize={22} fontWeight={"bold"}>
              My Rank
            </Text>
          </Flex>
          <Flex flexDir="column" w="100%" my={[10, 10, 20]}>
            <Text mb={5} fontSize={22} fontWeight={"bold"}>
              내가 올린 문제
            </Text>
            <Grid
              templateColumns="repeat(3, 1fr)"
              justifyItems="center"
              gap={8}
            >
              <MyQuestionCard />
              <MyQuestionCard />
              <MyQuestionCard />
              <MyQuestionCard />
            </Grid>
          </Flex>
        </>
      ) : (
        <Flex flexDir="column" gap={[4, 4, 8]} alignItems="center">
          <Button
            colorScheme="gray"
            w="fit-content"
            onClick={() => useMetamask(setSigner)}
          >
            🦊 로그인
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default My;
