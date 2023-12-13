import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="flex justify-center space-x-4">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="w-16 h-16" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold text-center my-4">Vite + React</h1>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    count is {count}
                </button>
                <p className="m-4">
                    Edit <code className="bg-gray-200 rounded p-1">src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="text-center text-gray-500">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
