import { useDogContract } from '../context/DogContractContext';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DogCard({ dog }) {
    const [img, setImg] = useState(dog.img);

    const { adopt } = useDogContract();

    useEffect(() => {
        async function load() {
            const reespose = await fetch(dog.img);
            const data = await reespose.json();
            const img = data.message;
            setImg(img);
        }
        load();
    }, [dog.img]);

    function handleAdopt(e) {
        e.preventDefault();
        adopt(dog.id);
    }


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="flex-grow">
                <img className="w-full object-cover" src={img} alt={dog.name} />
            </div>
            <div className="px-6 py-4 text-center mt-auto">
                <div className="font-bold text-xl mb-2">{dog.name}</div>
                <p className="text-gray-700 text-base">Age: {dog.age}</p>
                <p className="text-gray-700 text-base">Adopted: {dog.adopted ? "Yes" : "No"}</p>
                <div className="mt-4">
                    {dog.adopted ?
                        <p className="text-green-500 font-bold">Adopted by {dog.adopter}</p> :
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAdopt}
                        >Adopt</button>
                    }
                </div>
            </div>
        </div>
    )
}

DogCard.propTypes = {
    dog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        adopted: PropTypes.bool.isRequired,
        adopter: PropTypes.string,
    }).isRequired,
};

export default DogCard;