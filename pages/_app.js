import { ChakraProvider } from "@chakra-ui/react";
import { InjectedConnector, Provider, defaultChains } from "wagmi";
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

const connectors = () => [new InjectedConnector({ chains })];

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
