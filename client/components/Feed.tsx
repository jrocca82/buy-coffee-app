import { Flex, Heading, Text } from "@chakra-ui/react";
import { ContractContext } from "../context/useContractContext";
import { useContext, useEffect, useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";

type Memo = {
	from: string;
	name: string;
	timestamp: BigNumber;
	message: string;
};

const Feed = () => {
	const { address } = useAccount();
	const { coffeeContract } = useContext(ContractContext);

	const [memos, setMemos] = useState<Memo[]>([]);

	const getMemosFromContract = useCallback(async () => {
		const res = await coffeeContract?.getMemos();
		setMemos(res);
	}, [coffeeContract]);

	useEffect(() => {
		getMemosFromContract();
	}, [address, getMemosFromContract]);
    
	if (!memos || memos.length === 0) {
		return <Heading size="lg">No coffees received! 😭</Heading>;
	}

	return (
		<Flex flexDir="column" justify="space-around" h="250px" my="20px">
			<Heading size="lg">Coffees received:</Heading>
			{memos.map((memo) => {
				return (
					<Flex key={memo.from.concat(memo.name)} flexDir="column" align="center">
						<Text fontWeight="bold">`&quot;`{memo.message}`&quot;`</Text>
						<Text>From: {memo.from}</Text>
						<Text>Alias: {memo.name}</Text>
					</Flex>
				);
			})}
		</Flex>
	);
};

export default Feed;
