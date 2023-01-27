import { ChakraProvider } from '@chakra-ui/react';
import { createClient, WagmiConfig, useContract } from 'wagmi';
import { configureChains } from '@wagmi/core';
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  foundry,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/core/chains';
import { extendTheme } from '@chakra-ui/react';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import gameABI from 'constants/ABI/MainGame.json';
import nftABI from 'constants/ABI/MainNFT.json';
import tokenABI from 'constants/ABI/MainToken.json';

const gameAddress = '0x37b8A7615eDd512c329468A2932083807337a163';
const nftAddress = '0x77eFB7ed59Ca1e35dacA17bAaC473A70fb6E8e54';
const tokenAddress = '0x76c57C952831F450C75fd28DC464B9b8D563fFE4';

const { chains, provider, webSocketProvider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY ? process.env.ALCHEMY_KEY : '' }), publicProvider()],
);

// const client = createClient({
//   provider,
//   webSocketProvider,
//   autoConnect: true,
// });

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const MyApp = ({ Component, pageProps }: AppProps) => {
  /* const gameContract = useContract({
    addressOrName: '0x37b8A7615eDd512c329468A2932083807337a163',
    contractInterface: gameABI,
  }) */
  // console.log(process.env.ALCHEMY_KEY)
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
