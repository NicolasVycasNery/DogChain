// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Adoption {
    address[16] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15, "Pet ID must be between 0 and 15");

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    // Retrieving the adopter of a specific pet
    function getAdopter(uint petId) public view returns (address) {
        require(petId >= 0 && petId <= 15, "Pet ID must be between 0 and 15");

        return adopters[petId];
    }

    // pass the adoption to another address
    function transferAdoption(uint petId, address newAdopter) public returns (uint) {
        require(petId >= 0 && petId <= 15, "Pet ID must be between 0 and 15");
        require(adopters[petId] == msg.sender, "You are not the owner of this pet");

        adopters[petId] = newAdopter;

        return petId;
    }
}


// File: contracts/Adoption.sol