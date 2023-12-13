import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';

import PropTypes from 'prop-types'

export const Web3Context = createContext(null);

export const Web3Provider = ({
    children,
}) => {
    const { ethereum } = window;
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);

    const load = async () => {
        if (!ethereum) {
            alert("Install Metamask");
            try {
                await ethereum.enable();
                console.log("User has allowed account access to DApp...");
            } catch {
                alert("User denied account access...");
                return;
            }
            return;
        }
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
    }

    useEffect(() => {
        load();
    }, []);


    return (
        <Web3Context.Provider value={{ signer, provider }}>
            {children}
        </Web3Context.Provider>
    );
};

Web3Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

