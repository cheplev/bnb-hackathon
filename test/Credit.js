const {expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credit", () => {
    let bank
    let user
    let nftAddr;
    
    beforeEach(async () => {
        [bank, user] = await ethers.getSigners()
        const creditFactory = await ethers.getContractFactory("Credit", bank)
        const NFTFactory = await ethers.getContractFactory("NFT", bank)
        nft = await NFTFactory.deploy()
        credit = await creditFactory.deploy(nft.address)

        await credit.deployed()
        await nft.deployed()
    })

    it("should be deployed", async () => {
        console.log('success!')
        expect(credit.address).to.be.properAddress
        expect(credit.address).to.be.properAddress
        console.log(nft.address);
        nftAddr = nft.address
    })
    
    it("should mark loan as paid back and create an NFT after payment", async () => {
        const amount = 100;
        const rate = 10;
        const duration = 1;

        await credit.connect(user).createLoan(amount, rate, duration);

        const loan = await credit.getLoan(1);

        await credit.connect(user).payBackLoan(1, { value: amount + ((amount * rate) / 100) });

    });

})