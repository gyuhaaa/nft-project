import {
  Box,
  Button,
  Collapse,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";

const MyQuizCard: FC<IMyQuizData> = ({
  answer,
  description,
  questionImage,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
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
          p="20px"
          color="white"
          mt="4"
          bg="blue.700"
          opacity={0.7}
          rounded="md"
          shadow="md"
        >
          <Text
            fontSize={[18, 18, 22]}
            fontWeight="semibold"
            bgColor={"white"}
            color={"black"}
            w={"108%"}
            textAlign={"center"}
            roundedLeft={"2xl"}
            py={1}
            px={5}
            mb={2}
          >
            {answer}
          </Text>
          <Text fontSize={[17, 17, 20]}>{description}</Text>
        </Box>
      </Collapse>
    </GridItem>
  );
};

export default MyQuizCard;
