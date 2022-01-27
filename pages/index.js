import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useContract, useNetwork, useSigner } from "wagmi";

// components
import Header from "../components/Header";

import EarlyRetireABI from "../ABIs/EarlyRetireABI.json";
import Body from "../components/Body";
import NotSupportedNetwork from "../components/NotSupportedNetwork";

export default function Home() {
  const [{ data: signerData }] = useSigner();
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: EarlyRetireABI.abi,
    signerOrProvider: signerData,
  });

  const [{ data: networkData }, switchNetwork] = useNetwork();

  return (
    <Box>
      <Head>
        <title>Early Retire Dapp</title>
        <meta name="description" content="Early Retire Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {networkData.chain?.id == 97 ? (
        <Body contract={contract} />
      ) : (
        <NotSupportedNetwork switchNetwork={switchNetwork} />
      )}
    </Box>
  );
}
