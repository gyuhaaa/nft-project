import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Game",
    path: "/game",
  },
  {
    name: "Rank",
    path: "/rank",
  },
  {
    name: "My",
    path: "/my",
  },
];

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Heading>
      <Flex
        w={"100%"}
        h={20}
        alignItems={"center"}
        justifyContent={"center"}
        mb={10}
      >
        <Flex pr={10}>gyuseon</Flex>
        <Flex display={["none", "none", "flex"]} gap={4}>
          {navLinks.map((v, i) => (
            <Button key={i} onClick={() => navigate(v.path)}>
              {v.name}
            </Button>
          ))}
        </Flex>
        <Spacer />
        <Flex>
          <Button>로그인</Button>
        </Flex>
      </Flex>
    </Heading>
  );
};

export default Header;
