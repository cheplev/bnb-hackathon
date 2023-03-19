const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('NFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("contract deployed to:", nftContract.address);

    let txn = await nftContract.makeAnNFT('0x36FAa2f0aA969ffAE5A6242b793F060F3790b4d5', '5')

    await txn.wait()
    console.log("Minted NFTs #1")

};

const runMain = async () => {
        try{
            await main();
            process.exit(0);
        } catch(error) {
            console.log(error);
            process.exit(1);
        }

};

runMain();