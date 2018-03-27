// truffle.js

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // localhost
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      host: "127.0.0.1",
      port: 8546,
      network_id: 3,
      from: "0xc2b5ee6221aef38bea68df614b739881acfa2bf7",
      gas: 4700000,
    },
    live: {
      host: "127.0.0.1",
      port: 8547,
      network_id: 1,
      from: "0x5e0463e07f8feaef201a58636599611de3af3a2a",
      gasPrice: 14281250000,
    },
  },
};
