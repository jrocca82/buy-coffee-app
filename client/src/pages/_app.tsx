import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
	const { chains, provider } = configureChains(
		[goerli],
		[
			alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
			publicProvider(),
		]
	);

	const { connectors } = getDefaultWallets({
		appName: "My RainbowKit App",
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: false,
		connectors,
		provider,
	});

	return (
		<ChakraProvider>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider
					chains={chains}
					coolMode
					theme={darkTheme({
						accentColor: "#f47dbb",
						accentColorForeground: "white",
						borderRadius: "medium",
					})}
				>
						<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
}
