import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import contractABI from "../contracts/DogContract.json";
import { useWeb3 } from "./web3Context.jsx";

export const DogContractContext = createContext(null);
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const DogContractProvider = ({
    children,
}) => {
    const { signer } = useWeb3();
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);

    function checkContract() {
        if (!contract) {
            return false;
        }
        return true;
    }

    async function adopt(id) {
        if (checkContract()) {
            return;
        }
        try {
            const tx = await contract.adopt(id);
            await tx.wait();
        } catch (e) {
            setError(e.message);
        }

    }

    async function getAdopters() {
        if (checkContract()) {
            return;
        }
        try {
            const adopters = await contract.getAdopters();
            return adopters;
        } catch (e) {
            setError(e.message);
        }
    }

    async function getAdopter(id) {
        if (checkContract()) {
            return;
        }
        try {
            const adopter = await contract.getAdopter(id);
            return adopter;
        } catch (e) {
            setError(e.message);
        }
    }

    async function transferAdoption(id, to_address) {
        if (checkContract()) {
            return;
        }
        try {
            const tx = await contract.transferAdoption(id, to_address);
            await tx.wait();
        } catch (e) {
            setError(e.message);
        }
    }

    async function load() {
        const abi = contractABI.abi;
        if (!signer) {
            console.error("Signer not loaded");
            return;
        }
        if (!ethers.utils.isAddress(ContractAddress)) {
            console.error("Invalid contract address");
            return;
        }
        if (!abi) {
            console.error("Invalid abi");
            return;
        }
        // Create a new ethers.js instance
        const contract = new ethers.Contract(ContractAddress, abi, signer);
        setContract(contract);
    }

    useEffect(() => {
        if (signer) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

    return (
        <DogContractContext.Provider value={{
            error,
            adopt,
            getAdopters,
            getAdopter,
            transferAdoption,
        }}>
            {children}
        </DogContractContext.Provider>
    );
}

DogContractProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useDogContract() {
    const context = useContext(DogContractContext);
    if (context === undefined) {
        throw new Error('useDogContract must be used within a DogContractProvider');
    }
    return context;
}


