import { useState } from "react";
import { Flex, Input, Button, Text, Spinner } from "@chakra-ui/react";
import { usePrepareContractWrite } from "wagmi";
import abi from "../utils/BuyMeACoffee.json";
import { useContractWrite, useAccount } from "wagmi";
import { createStandaloneToast } from "@chakra-ui/toast";
import { ethers } from "ethers";

const { ToastContainer, toast } = createStandaloneToast();

const BuyCoffeeForm = () => {
	const [name, setName] = useState<string>();
	const [message, setMessage] = useState<string>();
	const [loading, setLoading] = useState<boolean>();

	const contractAddress = "0x5C2a9B102e46E13653BAeFe52891Db2E89EaDcF9";
	const contractABI = abi.abi;

	const { address } = useAccount();

	const { config } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractABI,
		functionName: "buyCoffee",
		args: [name, message],
		overrides: {
			from: address,
			value: ethers.utils.parseEther("0.001"),
		},
	});

	const { write } = useContractWrite(config);

	const submitCoffee = () => {
		setLoading(true);
		if (!name || !message) {
			toast({
				title: "Error!",
				description:
					"Please make sure to fill out your name and a message for Jo!",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
		try {
			write?.();
			toast({
				title: "Sending!",
				description: "Confirm the transaction in your wallet!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} catch (e) {
			toast({
				title: "Error!",
				description: "Cannot send a coffee right now",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
		setLoading(false);
	};

	return (
		<Flex flexDir="column" justify="space-around" h="250px" my="20px">
			<ToastContainer />
			<Flex flexDir="column">
				<Text fontWeight="bold">Name:</Text>
				<Input value={name} onChange={(e) => setName(e.target.value)} />
			</Flex>
			<Flex flexDir="column" mt="10px">
				<Text fontWeight="bold">Send Jo a message!:</Text>
				<Input value={message} onChange={(e) => setMessage(e.target.value)} />
			</Flex>
			<Button my="15px" onClick={submitCoffee} disabled={!write}>
				{loading ? <Spinner /> : "Send 1 Coffee for 0.001 ETH"}
			</Button>
		</Flex>
	);
};

export default BuyCoffeeForm;
