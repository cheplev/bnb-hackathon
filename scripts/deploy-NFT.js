const hre = require("hardhat");

const main = async () => {
  // Get the contract factory
  const NFTContract = await hre.ethers.getContractFactory("NFT");

  // Deploy the contract to the Binance Smart Chain Testnet
  const nftContract = await NFTContract.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Mint an NFT
  const txn = await nftContract.makeAnNFT("0x29F0d2316DD20c00dE2402Baa65947f442a158E3", "1");
  await txn.wait();
  console.log("Minted NFT #1");
};

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });