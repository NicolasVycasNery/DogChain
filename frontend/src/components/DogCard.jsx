import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useWeb3 } from '../hooks.js';
import { useState } from 'react';

function DogCard({ dog, isOwner }) {
    const { adopt, transferAdoption,getAdopter } = useWeb3();
    const [dogState, setDogState] = useState(dog);

    async function handleAdopt(e) {
        e.preventDefault();
        const { id } = dogState;
        console.log("adopting dog with id: ", id);
        const hash = await adopt(id);
        Swal.fire({
            title: `You adopted ${dogState.name}, congrats!`,
            text: `Transaction hash: ${hash}`,
            icon: 'success',
            confirmButtonText: 'Cool',
        });

        const dog = { ...dogState };

        dog.adopted = true;
        dog.adopter = await getAdopter(id);

        setDogState(dog);
    }

    async function handleTransferAdoption(e) {
        e.preventDefault();
        const { id } = dogState;
        const { value: address } = await Swal.fire({
            title: 'Enter the address of the new owner',
            input: 'text',
            inputLabel: 'Address',
            inputPlaceholder: 'Enter the address of the new owner',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
        });
        if (!address || address.length != 42) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to enter an valid address!',
            });
            return;
        }

        const hash = await transferAdoption(id, address);
        Swal.fire({
            title: `You transferred ${dogState.name} to ${address}, congrats!`,
            text: `Transaction hash: ${hash}`,
            icon: 'success',
            confirmButtonText: 'Cool',
        });
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="flex-grow">
                <img className="w-full h-64 object-cover"
                    src={dogState.img} alt={dogState.name} />
            </div>
            <div className="px-6 py-4 text-center mt-auto">
                <div className="font-bold text-xl mb-2">{dogState.name}</div>
                <p className="text-gray-700 text-base">Age: {dogState.age}</p>
                <p className="text-gray-700 text-base">Adopted: {dogState.adopted ? "Yes" : "No"}</p>
                <p className="text-gray-700 text-base">
                    <span className="text-sm">
                        id: {dogState.id}
                    </span>
                </p>
                <div className="mt-4">
                    {dogState.adopted ?
                        <p className="text-green-500 font-bold">Adopted by 
                        <span style={{
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                            fontSize: "0.8rem",
                        }}> {dogState.adopter}</span>
                        </p> :
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAdopt}
                        >
                            Adopt
                        </button>
                    }
                    {
                        isOwner &&
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4"
                            onClick={handleTransferAdoption}
                        >
                            Transfer Adoption
                        </button>
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
    isOwner: PropTypes.bool,
};

export default DogCard;