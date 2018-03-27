// migrations/3_deploy_manager.js

const ContractManager = artifacts.require('ContractManager')
const UserStorage = artifacts.require('UserStorage');
const TweetStorage = artifacts.require('TweetStorage');

module.exports = (deployer) => {
  
  deployer.deploy(ContractManager)
  .then(() => {
    return ContractManager.deployed()
  })
  .then(manager => {
    return Promise.all([
      manager.setAddress("UserStorage", UserStorage.address),
      manager.setAddress("TweetStorage", TweetStorage.address),
    ])
  })

}
