import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Web3 from 'web3';
import contractABI from "../contracts/DogContract.json";

export const Web3Context = createContext(null);
const ContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const RPC_URL = "http://127.0.0.1:8545/";



const alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
});

export const Web3ContextProvider = ({
    children,
}) => {
    const [error, setError] = useState(null);
    const [publicAddress, setPublicAddress] = useState(null);

    async function loadWeb3() {
        let web3Provider;
        // Modern dapp browsers...
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                web3Provider = window.ethereum;
            } catch {
                alert("User denied account access...");
                return;
            }
        }
        // Legacy dapp browsers..
        else if (window.web3) {
            web3Provider = window.web3.currentProvider;
        }
        // Legacy dapp browsers..
        else {
            web3Provider = new Web3.providers.HttpProvider(RPC_URL);
        }

        const provider = new ethers.JsonRpcProvider(
            RPC_URL
        )
        const signer = await provider.getSigner(
            window.ethereum.selectedAddress
        );
        return {
            signer,
            provider,
            web3Provider
        }
    }

    async function getSingerContract() {
        const { abi } = contractABI;
        const { provider } = await loadWeb3();
        // load contract
        const contract = new ethers.Contract(ContractAddress, abi, provider);
        return contract;
    }

    async function getProviderContract() {
        const { abi } = contractABI;
        const { signer } = await loadWeb3();
        // load contract
        const contract = new ethers.Contract(ContractAddress, abi, signer);
        return contract;
    }

    async function adopt(id) {
        try {
            const contract = await getProviderContract();
            const tx = await contract.adopt(id);
            await tx.wait(1);
            console.log(tx);
            return tx.data;
        } catch (e) {
            setError(e.message);
        }

    }

    async function getAdopters() {
        try {
            const contract = await getSingerContract();
            const adopters = await contract.getAdopters();
            return adopters;
        } catch (e) {
            setError(e.message);
        }
    }

    async function getAdopter(id) {
        try {
            const contract = await getSingerContract();
            const adopter = await contract.getAdopter(id);
            return adopter;
        } catch (e) {
            setError(e.message);
        }
    }

    async function transferAdoption(id, to_address) {
        try {
            const contract = await getProviderContract();
            const tx = await contract.transferAdoption(id, to_address);
            await tx.wait();
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        loadWeb3();
        // get public address
        async function load() {
            const { signer } = await loadWeb3();
            const address = await signer.getAddress();
            setPublicAddress(address);
        }
        load().catch(e => console.log(e)).then(() => {
            console.log("done")
            console.log(publicAddress);
        });
    }, []);



    return (
        <Web3Context.Provider value={{
            adopt,
            getAdopters,
            getAdopter,
            transferAdoption,
            error
        }}>
            {children}
        </Web3Context.Provider>
    );
};

Web3ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
