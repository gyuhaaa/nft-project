import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  return (
    <Flex flexDir={"column"} p={10}>
      <Header signer={signer} setSigner={setSigner} />
      <Flex>
        <Outlet context={{ signer, setSigner }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
