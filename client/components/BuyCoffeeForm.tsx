import { useState } from "react";
import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { ContractContext } from "../context/useContractContext";
import { useContext, useCallback } from "react";
import { BigNumber } from "ethers";
import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer, toast } = createStandaloneToast();

type Memo = {
	from: string;
	name: string;
	timestamp: BigNumber;
	message: string;
};

const BuyCoffeeForm = () => {
	const [name, setName] = useState<string>();
	const [message, setMessage] = useState<string>();
	const { coffeeContract } = useContext(ContractContext);

    const buyCoffee = useCallback(async () => {
		await coffeeContract?.buyCoffee(name, message);
	}, [coffeeContract, name, message]);

	const submitCoffee = () => {
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
        buyCoffee();
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
			<Button my="15px" onClick={submitCoffee}>
				Send 1 Coffee for 0.001 ETH
			</Button>
		</Flex>
	);
};

export default BuyCoffeeForm;
