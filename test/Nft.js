const {expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mapping", () => {
    let bank
    let user
    
    beforeEach(async () => {
        [bank, user] = await ethers.getSigners()
        const mappingFactory = await ethers.getContractFactory("NFT", bank)
        mapping = await mappingFactory.deploy()
        await mapping.deployed()
    })

    it("should be deployed", async () => {
        console.log('success!')
        expect(mapping.address).to.be.properAddress
    })
    
    it("should set rating", async () => {
        const rat = await mapping.makeAnNFT('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', '5,00')

    })

})