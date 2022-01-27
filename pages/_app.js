import { ChakraProvider } from "@chakra-ui/react";
import { providers } from "ethers";
import { InjectedConnector, Provider, defaultChains, chain } from "wagmi";
import "../styles/globals.css";

const bscTestnetChain = {
  id: 97,
  name: "BSC testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorers: [
    { name: "bsc scan testnet", url: "https://testnet.bscscan.com" },
  ],
  testnet: true,
};

const chains = [bscTestnetChain, ...defaultChains];
const defaultChain = bscTestnetChain;

const connectors = () => [new InjectedConnector({ chains })];

const isChainSupported = (chainId) => chains.some((x) => x.id === chainId);

// const provider = ({ chainId }) =>
//   providers.getDefaultProvider(
//     isChainSupported(chainId) ? chainId : defaultChain.id
//   );

function MyApp({ Component, pageProps }) {
  return (
    <Provider autoConnect connectors={connectors}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
