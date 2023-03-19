const hre = require("hardhat");

const main = async () => {
  // Get the contract factory
  const NFTContract = await hre.ethers.getContractFactory("NFT");

  // Deploy the contract to the Binance Smart Chain Testnet
  const nftContract = await NFTContract.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Mint an NFT
  const txn = await nftContract.makeAnNFT("0x5681B966d23A2bc87564f1654ae3b9Cada65902A", "5");
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