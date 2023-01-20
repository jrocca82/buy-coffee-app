import { ethers } from "ethers";
import React, { ReactNode, createContext } from "react";
import abi from "../utils/BuyMeACoffee.json";
import { useSigner } from "wagmi";

interface IContractContext {
	coffeeContract?: ethers.Contract;
}

export const ContractContext = createContext({} as IContractContext);

export const ContractContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { data: signer } = useSigner();
	if (!signer) {
		return <ContractContext.Provider
        value={{}}
    >
        {children}
    </ContractContext.Provider>;
	}

	const contractAddress = "0x5C2a9B102e46E13653BAeFe52891Db2E89EaDcF9";
	const contractABI = abi.abi;

	const coffeeContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);

	return (
		<ContractContext.Provider
			value={{
				coffeeContract,
			}}
		>
			{children}
		</ContractContext.Provider>
	);
};
