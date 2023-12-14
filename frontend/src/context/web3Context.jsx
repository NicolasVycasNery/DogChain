import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export function useWeb3() {
    const context = useContext(Web3Context);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
}



