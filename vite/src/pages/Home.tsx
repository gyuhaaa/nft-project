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
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import imgData from "../../public/json/imgData.json";

const Home: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const [questionImage, setQuestionImage] = useState<string | undefined>(
    undefined
  );
  const [answerImage, setAnswerImage] = useState<string | undefined>(undefined);
  const [answer, setAnswer] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => console.log(mintContract), [mintContract]);

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

      setAnswerImage(imageUrl);

      console.log(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadMetadata = async () => {
    if (!questionImage || !answer) return;

    console.log(answerImage);
    if (!answerImage) {
      setAnswerImage(questionImage);
    }

    try {
      const metadata = JSON.stringify({
        pinataContent: {
          answer,
          description,
          questionImage,
          answerImage,
        },
        pinataMetadata: {
          name: "test_24061904.json",
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
      <Flex justifyContent={"center"}>
        <Image src="../../public/images/main.png" />
        {/* <Center w={"100%"} fontSize={30} fontWeight={"bold"}>
          미적 감각이 0에 수렴하는 사람이 홈페이지를 만들면
        </Center> */}
      </Flex>
      <Flex bgColor={"gray.100"} h={"100"} my={3}>
        <Center w={"100%"} fontWeight={"bold"}>
          현재 등록된 문제 수 : {imgData.length}
        </Center>
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
                  id="questionFile"
                  type="file"
                  onChange={onChangeQuestionImg}
                />
                <label htmlFor="questionFile">
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
                  id="answerFile"
                  type="file"
                  onChange={onChangeAnswerImg}
                />
                <label htmlFor="answerFile">
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
