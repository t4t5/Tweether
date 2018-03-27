// migrations/7_deploy_ico.js

const TweetherToken = artifacts.require("TweetherToken")
const TweetherICO = artifacts.require("TweetherICO")

module.exports = (deployer) => {

  deployer.deploy(TweetherICO, TweetherToken.address)
  .then(() => {
    return TweetherToken.deployed()
  })
  .then(token => {
    return token.fundICO(TweetherICO.address)
  })

}
