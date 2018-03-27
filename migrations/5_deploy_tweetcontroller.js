// migrations/5_deploy_tweetcontroller.js

const TweetController = artifacts.require('TweetController')
const TweetStorage = artifacts.require('TweetStorage');
const ContractManager = artifacts.require('ContractManager')

module.exports = (deployer) => {

  deployer.deploy(TweetController)
  .then(() => {
    return TweetController.deployed()
  })
  .then(tweetCtrl => {
    tweetCtrl.setManagerAddr(ContractManager.address) 

    return Promise.all([
      ContractManager.deployed(),
      TweetStorage.deployed(),
    ])
  })
  .then(([manager, storage]) => {
    return Promise.all([
      manager.setAddress("TweetController", TweetController.address),
      storage.setControllerAddr(TweetController.address),
    ])
  })

}
