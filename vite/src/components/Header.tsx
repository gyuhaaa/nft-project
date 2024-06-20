import {
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../lib";
import { JsonRpcSigner } from "ethers";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Game",
    path: "/game",
  },
  // {
  //   name: "Rank",
  //   path: "/rank",
  // },
  {
    name: "My",
    path: "/my",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    setSigner(null);
    localStorage.setItem("isLogin", "false");
  };

  return (
    <Heading>
      <Flex
        w={"100%"}
        h={20}
        alignItems={"center"}
        justifyContent={"center"}
        mb={10}
      >
        <Flex pr={10}>
          <Image src="../public/images/logo_border_2.png" w={100} />
        </Flex>
        <Flex display={["none", "none", "flex"]} gap={4}>
          {navLinks.map((v, i) => (
            <Button key={i} variant={"link"} onClick={() => navigate(v.path)}>
              {v.name}
            </Button>
          ))}
        </Flex>
        <Spacer />
        <Flex display={["none", "none", "flex"]} w={40} justifyContent="end">
          {signer ? (
            <Menu>
              <MenuButton
                colorScheme="gray"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {signer.address.substring(0, 7)}...
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onClickLogOut} fontSize={20}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button colorScheme="gray" onClick={() => useMetamask(setSigner)}>
              🦊 로그인
            </Button>
          )}
        </Flex>

        <Flex display={["flex", "flex", "none"]}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {signer ? `${signer.address.substring(0, 7)}...` : "메뉴"}
            </MenuButton>
            <MenuList>
              {!signer && (
                <MenuItem onClick={() => useMetamask(setSigner)}>
                  로그인
                </MenuItem>
              )}
              {navLinks.map((v, i) => (
                <MenuItem
                  key={i}
                  onClick={() => navigate(v.path)}
                  fontSize={20}
                >
                  {v.name}
                </MenuItem>
              ))}
              {signer && (
                <MenuItem onClick={onClickLogOut} fontSize={20}>
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Heading>
  );
};

export default Header;
