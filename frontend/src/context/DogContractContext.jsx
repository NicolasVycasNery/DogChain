import { createContext, useEffect, useState, useContext } from "react";
import { ethers } from 'ethers';
import PropTypes from 'prop-types'
import { Web3Context } from "./web3Context.jsx";
import contractABI from "../contracts/DogContract.json";

export const DogContractContext = createContext(null);
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const DogContractProvider = ({
    children,
}) => {
    const { signer } = useContext(Web3Context);
    const [contract, setContract] = useState(null);

    const load = async () => {
        // Create a new ethers.js instance
        const contract = new ethers.Contract(ContractAddress, contractABI.abi, signer);
        setContract(contract);
    };

    useEffect(() => {
        if (signer) {
            load();
        }
    }, [signer]);

    return (
        <DogContractContext.Provider value={{
            contract,
        }}>
            {children}
        </DogContractContext.Provider>
    );
}

DogContractProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
