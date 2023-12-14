import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, ContractFactory, Contract } from "ethers";
import { Adoption__factory, Adoption } from "../typechain-types";


describe("Adoption", function () {
    let Adoption: Adoption__factory;
    let adoption: Adoption;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let addrs: Signer[];

    beforeEach(async function () {
        Adoption = await ethers.getContractFactory("Adoption");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        adoption = await Adoption.deploy();
    });

    it("Should adopt a pet", async function () {
        await adoption.connect(addr1).adopt(1);
        expect(await adoption.getAdopter(1)).to.equal(await adoption.getAdopter(1));
    });

    it("Should retrieve all adopters", async function () {
        await adoption.connect(addr1).adopt(1);
        await adoption.connect(addr2).adopt(2);
        
        const adopters = await adoption.getAdopters();
        expect(adopters[1]).to.equal(await addr1.getAddress());
        expect(adopters[2]).to.equal(await addr2.getAddress());
    });

    it("Should transfer adoption to another address", async function () {
        await adoption.connect(addr1).adopt(1);
        await adoption.connect(addr1).transferAdoption(1, addr2.getAddress());
        expect(await adoption.getAdopter(1)).to.equal(await addr2.getAddress());
    });

    it("Should fail if petId is not between 0 and 15", async function () {
        await expect(adoption.connect(addr1).adopt(16)).to.be.revertedWith("Pet ID must be between 0 and 15");
    });

    it("Should fail if not the owner of the pet", async function () {
        await adoption.connect(addr1).adopt(1);
        await expect(adoption.connect(addr2).transferAdoption(1, addr2.getAddress())).to.be.revertedWith("You are not the owner of this pet");
    });
});