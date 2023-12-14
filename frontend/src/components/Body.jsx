import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dogsData from '../data/dogs.js';
import { useWeb3 } from '../hooks';
import DogCard from './DogCard';
import { ethers } from 'ethers';


function Body() {
    const [dogs, setDogs] = useState(dogsData);
    const { getAdopters, error } = useWeb3();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // update the state of the dog adoption list
        async function load() {
            const adopters = await getAdopters();
            if (!adopters)
                return;
            const dogs = dogsData.map((dog, i) => {
                const adopter = adopters[i];
                const adopted = adopters[i] != "0x0000000000000000000000000000000000000000"
                return {
                    ...dog,
                    adopter: adopter,
                    adopted: adopted
                };
            });
            setDogs(dogs);
            setLoading(false);
        }
        load();
    }, []);

    useEffect(() => {
        if (error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            });
    }, [error]);



    return (
        <>
            <section className="p-6 min-h-screen bg-gray-200">
                <h1 className="text-4xl font-bold mb-4">
                    All Dogs
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        !loading ?
                            dogs.map((dog, i) => {
                                return (
                                    <DogCard
                                        dog={dog}
                                        key={i}
                                    />
                                )
                            })
                            :
                            <div className="text-2xl font-bold text-center">
                                Loading...
                            </div>
                    }
                </div>
            </section>
            <section className="p-6 min-h-screen bg-gray-200">
                <h1 className="text-4xl font-bold mb-4">
                    Your Dogs
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        !loading ?
                            dogs.filter(dog => {
                                return ethers.getAddress(dog.adopter) === ethers.getAddress(window.ethereum.selectedAddress);
                            }).map((dog, i) => {
                                return (
                                    <DogCard
                                        dog={dog}
                                        key={i}
                                        isOwner={true}
                                    />
                                )
                            }) :
                            <div className="text-2xl font-bold text-center">
                                Loading...
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Body;