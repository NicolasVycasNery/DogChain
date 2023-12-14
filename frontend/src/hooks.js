import { useContext } from "react";
import Swal from 'sweetalert2';
import { Web3Context } from "./context/web3Context.jsx";

export function useWeb3() {
    const context = useContext(Web3Context);
    if (context === undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
}