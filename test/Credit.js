const {expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credit", () => {
    let bank
    let user
    
    beforeEach(async () => {
        [bank, user] = await ethers.getSigners()
        const creditFactory = await ethers.getContractFactory("Credit", bank)
        credit = await creditFactory.deploy()
        await credit.deployed()
    })

    it("should be deployed", async () => {
        console.log('success!')
        expect(credit.address).to.be.properAddress
    })
    
    it("should mark loan as paid back and create an NFT after payment", async () => {
        const amount = 100;
        const rate = 10;
        const duration = 1;

        await credit.connect(user).createLoan(amount, rate, duration);

        const loan = await credit.getLoan(1);

        await credit.connect(user).payBackLoan(1, { value: amount + ((amount * rate) / 100) });

        const paidBack = await credit.loans(1).paidBack;
        expect(paidBack).to.equal(true);
    });

})