import {
  Button,
  Flex,
  Heading,
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
  {
    name: "Rank",
    path: "/rank",
  },
  {
    name: "My",
    path: "/my",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    setSigner(null);
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
        <Flex pr={10}>gyuseon</Flex>
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
                colorScheme="blue"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {signer.address.substring(0, 7)}...
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>
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
                <MenuItem key={i} onClick={() => navigate(v.path)}>
                  {v.name}
                </MenuItem>
              ))}
              {signer && <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Heading>
  );
};

export default Header;
