import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <Flex flexDir={"column"} p={10}>
      <Header />
      <Flex>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
