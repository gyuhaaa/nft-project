import {
  Box,
  Collapse,
  Flex,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

const MyQuizCard: FC<IMyQuizData> = ({
  owner,
  answer,
  description,
  questionImage,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isShowMyQuiz, setIsShowMyQuiz] = useState<boolean>(false);
  const { signer } = useOutletContext<OutletContext>();

  useEffect(() => {
    if (!signer) return;

    if (owner === signer.address) {
      setIsShowMyQuiz(true);
    }
  }, [signer]);

  return (
    <>
      {isShowMyQuiz && (
        <GridItem display={"flex"} flexDir={"column"} minW={100}>
          <Box
            pos="relative"
            w={"fit-content"}
            mb={3}
            cursor={"pointer"}
            onClick={onToggle}
          >
            <Image src={questionImage} alt={answer} border={"gray solid 1px"} />
          </Box>
          <Collapse in={isOpen} animateOpacity>
            <Box
              position={"relative"}
              color="white"
              mt="4"
              bg="gray.900"
              opacity={0.7}
              rounded="md"
              shadow="md"
            >
              <Flex justifyContent={"right"} w={"100%"}>
                <Text
                  fontSize={[18, 18, 22]}
                  fontWeight="semibold"
                  bgColor={"white"}
                  color={"black"}
                  w={"90%"}
                  textAlign={"center"}
                  roundedLeft={"2xl"}
                  py={1}
                  px={5}
                  my={3}
                >
                  {answer}
                </Text>
              </Flex>
              <Text px={"20px"} pb={"20px"} pt={"10px"} fontSize={[17, 17, 20]}>
                {description}
              </Text>
            </Box>
          </Collapse>
        </GridItem>
      )}
    </>
  );
};

export default MyQuizCard;
