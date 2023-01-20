import Head from "next/head";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BuyCoffeeForm from "../../components/BuyCoffeeForm";
import Feed from "../../components/Feed";

export default function Home() {
	const { isConnected } = useAccount();

	return (
		<Flex flexDir="column" align="center" minH="100vh" w="100vw">
			<Head>
				<title>Buy Me A Coffee</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex flexDir="column" align="center" justify="center" h="80vh">
				<Heading mt="100px">Buy Jo a Coffee!</Heading>
				<Flex mt="30px">
					<ConnectButton
						showBalance={false}
						accountStatus={{
							smallScreen: "avatar",
							largeScreen: "address",
						}}
						chainStatus="name"
					/>
				</Flex>
				{!isConnected && (
					<Text size="lg" mt="20px" w="50%" textAlign="center">
						* Please note that Rainbow Wallet is having some connection issues.
						Because of this, connecting your wallet may require you to refresh
						the page. To disconnect, your wallet extension instead of Rainbow
						{"'"}s disconnect button.
					</Text>
				)}
				{isConnected && (
					<>
						<BuyCoffeeForm /> <Feed />
					</>
				)}
			</Flex>
			<Flex
				borderTop="solid 1px grey"
				w="100%"
				align="center"
				justify="center"
				h="20vh"
			>
				<Text mt="30px">
					Created by Jo Rocca for Alchemy{"'"}s Road to Web3 lesson two!
				</Text>
			</Flex>
		</Flex>
	);
}
