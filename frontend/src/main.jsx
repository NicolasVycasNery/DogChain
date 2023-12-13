import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3Provider } from "./context/web3Context.jsx";
import { DogContractProvider } from "./context/DogContractContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Web3Provider>
            <DogContractProvider>
                <App />
            </DogContractProvider>
        </Web3Provider>

    </React.StrictMode>,
)
