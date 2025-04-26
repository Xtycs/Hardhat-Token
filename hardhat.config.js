require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// const ALCHEMY_API_KEY  = process.env.ALCHEMY_API_KEY;
// const ROPSTEN_PRIVATE_KEY = process.env.PRIVATE_KEY;

// This is a sample Hardhat task. You can create more tasks by creating new
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
/*  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [ ROPSTEN_PRIVATE_KEY ]
    }
  }
*/
};
