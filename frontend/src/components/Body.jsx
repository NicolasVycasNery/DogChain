import { useEffect, useState } from 'react';
import { useDogContract } from '../context/DogContractContext';
import dogsData from '../data/dogs.js';
import DogCard from './DogCard';


function Body() {
    const [dogs, setDogs] = useState(dogsData);
    const { getAdopters } = useDogContract();
    const [adopters, setAdopters] = useState([]);

    useEffect(() => {
        // update the state of the dog adoption list
        async function load() {
            const adopters = await getAdopters();
            console.log(adopters);
            setAdopters(adopters);
            const dogs = dogsData.map((dog, i) => {
                return { ...dog, adopter: adopters[i], adopted: adopters[i] != null };
            });
            setDogs(dogs);
        }
        load();
    }, [getAdopters]);

    return (
        <>
            <section className="p-6">
                <h1 className="text-4xl font-bold mb-4">
                    All Dogs
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dogs.map((dog, i) => {
                        return (
                            <DogCard
                                dog={dog}
                                key={i}
                            />
                        )
                    })}
                </div>
            </section>
            <section>
                <h1 className="text-4xl font-bold mb-4">
                    Your Dogs
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dogs.filter(dog => dog.adopted).map((dog, i) => {
                        return (
                            <DogCard
                                dog={dog}
                                key={i}
                            />
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Body;