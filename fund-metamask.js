// fund-metamask.js

const sender = web3.eth.accounts[1];
//const receiver = "0x51be0461d465ca650483d2a01f58eeefe1ee1e9c"
const receiver = "0xb7c60c8f27f6a944f923684606fe3b5ce8998a2e"
const amount = web3.toWei(10, 'ether');

module.exports = function(callback) {
  web3.eth.sendTransaction({
    from: sender, 
    to: receiver, 
    value: amount
  }, callback)
}
