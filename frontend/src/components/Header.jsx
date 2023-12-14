import dogPaw from '../assets/dog-paw.svg'

function Header() {
    return (
        <header className="bg-blue-500 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">DogChain</h1>
                    <h2 className="text-2xl">
                        Blockchain Powered Dog Adoption
                    </h2>
                </div>
                <div className="flex items-center">
                    <img src={dogPaw} alt="Dog Paw" className="h-32 w-32" />
                </div>
            </div>
        </header>
    )
}

export default Header