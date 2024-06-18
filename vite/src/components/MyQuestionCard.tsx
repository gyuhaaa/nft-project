import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

const MyQuestionCard: FC = () => {
  return (
    <GridItem display={"flex"} flexDir={"column"}>
      <Box pos="relative" w={"fit-content"}>
        <Image src={`/images/img1.png`} alt="name" border={"gray solid 1px"} />
      </Box>
      <Text fontSize={[18, 18, 22]} fontWeight="semibold">
        name
      </Text>
      <Text fontSize={[17, 17, 20]}>description</Text>
    </GridItem>
  );
};

export default MyQuestionCard;
