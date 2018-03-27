// migrations/6_deploy_token.js

const TweetherToken = artifacts.require("TweetherToken")

module.exports = (deployer) => {
  deployer.deploy(TweetherToken)
}
