require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");
require('dotenv').config();

const abi = require('ethereumjs-abi');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("sign", "tests signing a message", async (_, { web3 }) => {
  const [owner] = await ethers.getSigners();

  const [signer] = await web3.eth.getAccounts();

  // let data = 'Some data'
  
  const data = "0x" + abi.soliditySHA3([
        'address'
      ], [
        owner.address
      ]).toString('Hex');

  console.log()
  let signature = web3.eth.accounts.sign(data, process.env.KOVAN_PRIVATE_KEY)
  console.log("signature web3")
  console.log(signature)
  console.log("signature ethers")
  console.log(await owner.signMessage(data))

  // for (const account of accounts) {
  //   console.log(account.address);
  // }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Go to https://infura.io/ and create a new project
// Replace this with your Infura project ID
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const ALCHEMY_URL = `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY || '';
const KOVAN_PRIVATE_KEY_B = process.env.KOVAN_PRIVATE_KEY_B || '';

module.exports = {
  solidity: "0.6.2",
  networks: {
    kovan: {
      url: `${ALCHEMY_URL}`,
      saveDeployments: true,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`, `0x${KOVAN_PRIVATE_KEY_B}`],
      gas: 12487794,
      gasPrice: 5e10,
      networkCheckTimeout: 500000000,
      timeoutBlocks: 200
    },
    local: {
      url: `http://localhost:8545`
    }
  }
};
