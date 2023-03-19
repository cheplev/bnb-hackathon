const {expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rating", () => {
    let bank
    let user
    
    beforeEach(async () => {
        [bank, user] = await ethers.getSigners()
        const RatingFactory = await ethers.getContractFactory("Rating", bank)
        rating = await RatingFactory.deploy()
        await rating.deployed()
    })

    it("should be deployed", async () => {
        console.log('success!')
        expect(rating.address).to.be.properAddress
    })
    
    it("should set rating", async () => {
      const myRating = 5
      const settingRat = await rating.setRating('1234567', myRating)
      const userRat = await rating.getRating('1234567')
      expect(userRat).to.eq(myRating * 100)
    })

})