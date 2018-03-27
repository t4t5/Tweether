// test/integration/token.js

const TweetherToken = artifacts.require("TweetherToken")
const TweetherICO = artifacts.require("TweetherICO")

const web3 = require("web3")

const { 
  utils: { toWei },
} = web3

contract("token", (accounts) => {

  it("distributes token supply", async () => {
    const token = await TweetherToken.deployed()
    const ico = await TweetherICO.deployed()
    
    const icoBalance = await token.balanceOf.call(ico.address)
    const founderBalance = await token.balanceOf.call(accounts[0])

    assert.equal(icoBalance.toString(), "750000")
    assert.equal(founderBalance.toString(), "250000")
  })

  it("can buy tokens", async () => {
    const token = await TweetherToken.deployed()
    const ico = await TweetherICO.deployed()

    const userAddr = accounts[1]
    const wei = toWei("1", "ether")

    await ico.sendTransaction({
      from: userAddr,
      value: wei,
    })

    const userBalance = await token.balanceOf.call(userAddr);

    assert.equal(userBalance.toString(), "1000")

    const icoBalance = await token.balanceOf.call(ico.address);

    assert.equal(icoBalance.toString(), "749000")
  })

})
