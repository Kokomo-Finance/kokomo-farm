const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString()

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
  //  development: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  },
   test: {
     provider: () => new HDWalletProvider({
      mnemonic,
      providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      chainId: 97,
     }),
     network_id: 97,
     skipDryRun: true
   }
  },
  compilers: {
    solc: {
      version: "0.6.12"
    }
  }
};
