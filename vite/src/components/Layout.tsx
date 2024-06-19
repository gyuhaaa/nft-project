import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";
import { getSigner } from "../lib";
import { Contract } from "ethers";
import mintContractAbi from "../lib/mintContractAbi.json";
import { mintContractAddress } from "../lib/contractAddress";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  mintContract: Contract | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) return;

    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
  }, [signer]);

  useEffect(() => console.log(mintContract), [mintContract]);

  useEffect(() => {
    const localIsLogin = localStorage.getItem("isLogin");

    if (localIsLogin === "true") {
      getSigner(setSigner);
    }
  }, []);

  return (
    <Flex flexDir={"column"} p={10}>
      <Header signer={signer} setSigner={setSigner} />
      <Flex>
        <Outlet context={{ signer, setSigner, mintContract }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
