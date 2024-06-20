import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import MyQuizCard from "../components/MyQuizCard";
import { useMetamask } from "../lib";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";
import axios from "axios";
import quizData from "../../public/json/imgData.json";

const My: FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [stsNftMetadata, setStsNftMetadata] = useState<StsNftMetadata>();
  const [mintedList, setMintedList] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isHave1, setIsHave1] = useState<boolean>(false);
  const [isHave7, setIsHave7] = useState<boolean>(false);

  const [isSuccess7, setIsSuccess7] = useState<boolean>(false);

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.balanceOfNfts(signer.address);

      const temp = response.map((v: bigint) => Number(v));

      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMintNft = async (tokenId: number) => {
    try {
      if (!mintContract || !tokenId || !amount) return;

      setIsLoading(true);

      const response = await mintContract.mintNft(tokenId, amount);

      await response.wait();

      const axiosResponse = await axios.get<NftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setStsNftMetadata({
        ...axiosResponse.data,
        tokenId,
        amount,
      });

      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCheckNfts();
    setAmount(1);
  }, [signer, mintContract]);

  useEffect(() => {
    if (mintedList.length === 0) return;
    // console.log(mintedList);

    if (mintedList[0] > 0) {
      setIsHave1(true);
    }
    if (mintedList[6] > 0) {
      setIsHave7(true);
    }

    const temp = mintedList.filter((v) => {
      if (v) {
        return v;
      }
    });

    setProgress((temp.length / mintedList.length) * 100);
  }, [mintedList]);

  useEffect(() => {
    const temp = localStorage.getItem("successNumber");

    if (Number(temp) > 0) {
      setIsSuccess7(true);
    }
  }, []);

  return (
    <Flex flexDir={"column"}>
      {signer ? (
        <>
          {/* <Flex flexDir={"column"}>
            <Text mb={5} fontSize={22} fontWeight={"bold"}>
              My Rank
            </Text>
            <Text>Game Rank</Text>
            <Text>Upload Rank</Text>
          </Flex> */}
          <Flex flexDir="column" w="100%" my={[10, 10, 20]}>
            <Text
              mb={16}
              fontSize={36}
              fontWeight={"bold"}
              bgColor={"gray.100"}
              textAlign={"center"}
              h={30}
            >
              My Quiz
            </Text>
            <Grid
              templateColumns={{
                sm: "repeat(3, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
                "2xl": "repeat(6, 1fr)",
              }}
              justifyItems="center"
              gap={8}
            >
              {quizData.map((v: IMyQuizData, i) => (
                <MyQuizCard
                  key={i}
                  owner={v.owner}
                  answer={v.answer}
                  description={v.description}
                  questionImage={v.questionImage}
                />
              ))}
            </Grid>
          </Flex>
          <Flex flexDir="column" w="100%" my={[10, 10, 20]}>
            <Text
              mb={16}
              fontSize={36}
              fontWeight={"bold"}
              bgColor={"gray.100"}
              textAlign={"center"}
              h={30}
            >
              My NFT
            </Text>
            <Flex
              flexDir="column"
              flexGrow={1}
              justifyContent="center"
              alignItems="center"
            >
              {signer ? (
                <Flex>
                  <Box>
                    <Flex
                      pos={"relative"}
                      w={[320, 320, 640]}
                      my={[3, 3, 6]}
                      gap={[2, 2, 4]}
                      alignItems="center"
                    >
                      <Text fontSize={[16, 16, 24]}>진행도</Text>
                      <Progress
                        // hasStripe
                        value={progress}
                        h={[5, 5, 8]}
                        flexGrow={1}
                        colorScheme="gray"
                      />
                      <Text
                        pos={"absolute"}
                        top={"50%"}
                        right={"50%"}
                        transform={"translate(100%,-50%)"}
                        fontWeight={"bold"}
                        fontSize={[16, 16, 24]}
                      >
                        {progress}%
                      </Text>
                    </Flex>
                    <Grid templateColumns={"repeat(4, 1fr)"}>
                      {mintedList.map((v, i) => (
                        <PuzzleCard key={i} index={i} balance={v} />
                      ))}
                    </Grid>
                  </Box>
                  <Flex alignItems={"baseline"} pt={[3, 3, 6]}>
                    <Flex
                      flexDir={"column"}
                      alignItems="end"
                      gap={3}
                      mx={[4, 4, 4, 10, 16]}
                      mb={16}
                      w={[330, 250, 330, 400]}
                    >
                      {!isHave1 && (
                        <Flex
                          flexDir="column"
                          gap={[2, 2, 4]}
                          px={5}
                          py={2}
                          bgColor={"gray.200"}
                          rounded={"lg"}
                          alignItems={"center"}
                          w={"100%"}
                        >
                          <Text fontSize={[14, 14, 18]} fontWeight="semibold">
                            내 게임에 찾아와준 거야? 기특해,
                          </Text>
                          <Button
                            colorScheme="blue"
                            opacity={0.7}
                            size={["sm", "sm", "md"]}
                            onClick={() => onClickMintNft(1)}
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            loadingText="Loading..."
                            w={"fit-content"}
                            fontSize={["sm", "sm", "md"]}
                          >
                            1번 퍼즐 받기
                          </Button>
                        </Flex>
                      )}
                      {!isHave7 && isSuccess7 && (
                        <Flex
                          flexDir="column"
                          gap={[2, 2, 4]}
                          px={5}
                          py={2}
                          bgColor={"gray.200"}
                          rounded={"lg"}
                          alignItems={"center"}
                          w={"100%"}
                        >
                          <Text fontSize={[14, 14, 18]} fontWeight="semibold">
                            첫 정답이잖아 ~ 럭키비키 NFT 줄게 ~
                          </Text>
                          <Button
                            colorScheme="blue"
                            opacity={0.7}
                            size={["sm", "sm", "md"]}
                            onClick={() => onClickMintNft(7)}
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            loadingText="Loading..."
                            w={"fit-content"}
                            fontSize={["sm", "sm", "md"]}
                          >
                            7번 퍼즐 받기
                          </Button>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Box pos="relative" w={[320, 320, 640]} mt={[4, 4, 24]}>
                  <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    bgColor="rgba(0,0,0,0.5)"
                  />
                  <Image src="/images/puzzle/puzzle.png" alt="King" />
                </Box>
              )}
            </Flex>
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
