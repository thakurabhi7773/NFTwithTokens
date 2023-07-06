

require('@nomiclabs/hardhat-waffle');

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      blockGasLimit: 300000000000
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId : 97,
      accounts: ["528f8444cd8c4abccf2487a2cb1fa4aeb49c51fb3336d9e9d21a0114f677ea84"],
      blockGasLimit: 300000000000
    },
  

    coverage: {
      url: 'http://localhost:8555',
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: "63WGXE717J54IBDK62I9FDC1WGSE8H8WE1",
  }
};