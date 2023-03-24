require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;
//* Default Template for Reference

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 31337
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};


// Configuration
/*
  solidity - The version of solidity compiler
  defaultNetwork - The Default network to run (Without running --network-name)
  networks - Object which contains the network information
  etherscan - Object to fill in EtherScan Information for contract verification
*/
// module.exports = {
//   solidity: "0.8.9",
// };
