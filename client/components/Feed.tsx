import { Flex, Heading, List, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import abi from "../utils/BuyMeACoffee.json";

type Memo = {
	from: string;
	name: string;
	timestamp: BigNumber;
	message: string;
};

const Feed = () => {
	const [memos, setMemos] = useState<Memo[]>([]);

	const contractAddress = "0x5C2a9B102e46E13653BAeFe52891Db2E89EaDcF9";
	const contractABI = abi.abi;

	const contractRead = useContractRead({
		address: contractAddress,
		abi: contractABI,
		functionName: "getMemos",
		watch: true,
	});

	useEffect(() => {
		const memos = contractRead.data as Memo[];
		setMemos(memos);
	}, [contractRead.data]);

	if (!memos || memos.length === 0) {
		return <Heading size="lg">No coffees received! 😭</Heading>;
	}

	if (contractRead.isLoading) {
		return <Spinner />;
	}

	if (contractRead.isError) {
		return <Text>Error loading messages</Text>;
	}

	return (
		<Flex
			flexDir="column"
			justify="space-around"
			h="350px"
			my="20px"
			align="center"
		>
			<Heading size="lg" mb="20px">
				Coffees received:
			</Heading>
			<Flex flexDir="column" height="80%" overflowY="scroll" mb="5vh">
				{memos.map((memo, i) => {
					return (
						<Flex
							key={memo.from.concat(memo.name)}
							flexDir="column"
							align="center"
							padding="10px"
							borderRadius={
								memos.length === 1
									? "10px"
									: i === 0
									? "10px 10px 0 0"
									: i === memos.length - 1
									? "0 0 10px 10px"
									: "none"
							}
							bgColor={i % 2 ? "#e3e3e3" : "pink"}
						>
							<Text fontWeight="bold">&quot;{memo.message}&quot;</Text>
							<Text>From: {memo.name}</Text>
							<Text>Address: {memo.from}</Text>
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
};

export default Feed;
