import "@styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  // mainnet,
  sepolia,
} from "wagmi/chains";

import { UserProvider } from "@hooks/UserContext";
import { TokenPriceProvider } from "@hooks/TokenPriceContext";

const config = getDefaultConfig({
  syncConnectedChain: true,
  appName: "RainbowKit App",
  projectId: "21c0092ad0d7c8f4982de950ad78b408",
  chains: [
    //mainnet,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <UserProvider>
            <TokenPriceProvider>
              <Component {...pageProps} />
            </TokenPriceProvider>
          </UserProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
