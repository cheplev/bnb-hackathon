const {expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mapping", () => {
    let bank
    let user
    
    beforeEach(async () => {
        [bank, user] = await ethers.getSigners()
        const mappingFactory = await ethers.getContractFactory("Mapping", bank)
        mapping = await mappingFactory.deploy()
        await mapping.deployed()
    })

    it("should be deployed", async () => {
        console.log('success!')
        expect(mapping.address).to.be.properAddress
    })
    
    it("should save passport hash pair", async () => {
        await mapping.saveHashPair('123142421')
        const adr = await mapping.getAddressByPass('123142421');
        expect(adr).to.eq(bank.address)
    })

})