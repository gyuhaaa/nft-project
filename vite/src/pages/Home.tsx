import {
  Button,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { JsonRpcSigner } from "ethers";
import { ChangeEvent, FC, useEffect, useState } from "react";

const Home: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [questionImage, setQuestionImage] = useState<string | undefined>(
    undefined
  );
  const [answerImage, setAnswerImage] = useState<string | undefined>(undefined);
  const [answer, setAnswer] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const uploadImage = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET,
          },
        }
      );

      return `https://jade-junior-ape-105.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeQuestionImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.files) return;

      const formData = new FormData();

      formData.append("file", e.currentTarget.files[0]);

      const imageUrl = await uploadImage(formData);

      // localStorage.setItem("questionImage", JSON.stringify(imageUrl));
      setQuestionImage(imageUrl);

      console.log(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAnswerImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.files) return;

      const formData = new FormData();

      formData.append("file", e.currentTarget.files[0]);

      const imageUrl = await uploadImage(formData);

      // localStorage.setItem("answerImage", JSON.stringify(imageUrl));
      setAnswerImage(imageUrl);

      console.log(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadMetadata = async () =>
    // answer: string,
    // questionImage: string,
    // answerImage: string
    {
      console.log(questionImage);
      console.log(answer);

      if (!questionImage || !answer) return;

      try {
        const metadata = JSON.stringify({
          pinataContent: {
            id: "1",
            answer,
            description,
            questionImage,
            answerImage,
            // name: "test",
            // description: "test",
            // image,
          },
          pinataMetadata: {
            // DB "img" + (count(*) + 1) + ".json"
            name: "test_24061701.json",
          },
        });

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          metadata,
          {
            headers: {
              "Content-Type": "application/json",
              pinata_api_key: import.meta.env.VITE_PINATA_KEY,
              pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET,
            },
          }
        );

        return `https://jade-junior-ape-105.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Flex flexDir={"column"} w={"100%"}>
      <Flex bgColor={"red.100"} h={"100"}>
        Homepage description
      </Flex>
      <Flex bgColor={"red.100"} h={"100"} my={3}>
        현재 등록된 문제 수
      </Flex>
      <Flex h={300} flexDir={"column"}>
        <Button onClick={onOpen} colorScheme="blue" opacity={0.6}>
          문제 등록하기
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>문제 등록하기</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent={"center"} gap={2}>
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={onChangeQuestionImg}
                />
                <label htmlFor="file">
                  <Center
                    w={"100px"}
                    h={"100px"}
                    bgColor={"blue.100"}
                    rounded={"lg"}
                    border={"gray solid 1px"}
                    cursor={"pointer"}
                  >
                    문제 이미지
                  </Center>
                </label>
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={onChangeAnswerImg}
                />
                <label htmlFor="file">
                  <Center
                    w={"100px"}
                    h={"100px"}
                    bgColor={"white"}
                    rounded={"lg"}
                    border={"gray solid 1px"}
                    cursor={"pointer"}
                  >
                    정답 이미지
                  </Center>
                </label>
              </Flex>
              <Flex my={3}>
                <Text mr={3}>정답 : </Text>
                <input
                  type="text"
                  width={"100%"}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Flex>
              <Text mb={1}>해설 (선택)</Text>
              <Textarea
                width={"100%"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={uploadMetadata}>
                Upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Home;
