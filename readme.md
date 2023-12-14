# Pet Adoption DApp

This project is a rewrite of the [Pet Shop tutorial](https://www.trufflesuite.com/tutorials/pet-shop) from Truffle. It uses React and Vite for the frontend, and Hardhat for the backend.

This project is a decentralized application (DApp) for pet adoption. It uses Ethereum smart contracts to handle the adoption process, ensuring transparency and security. The frontend is built with React and Vite, and the backend uses Hardhat for Ethereum development.

## Project Structure

The project is divided into two main parts:

1. `backend`: This directory contains the Ethereum smart contracts and the Hardhat configuration. The main contract is `Adoption`, which handles the adoption process.

2. `frontend`: This directory contains the React application. The main components are `Body` and `DogCard`, which display the list of dogs and the individual dog cards, respectively.

## Backend

The backend is a Hardhat project. It includes a sample contract, a test for that contract, and a script that deploys that contract.

To get started with the backend, run the following commands:

```sh
npm install
npx hardhat test
npx hardhat node
npx hardhat run ./scripts/deploy.ts --network localhost
```

## Frontend

The frontend is a React application built with Vite. It displays a list of dogs that can be adopted. Each dog has a card that displays its information and an "Adopt" button. If a dog is already adopted, the card will display the owner's address and a "Transfer Adoption" button.

To get started with the frontend, run the following commands:

```sh
npm install
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
