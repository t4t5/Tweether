// migrations/4_deploy_usercontroller.js

const UserController = artifacts.require('UserController')
const UserStorage = artifacts.require('UserStorage');
const ContractManager = artifacts.require('ContractManager')

module.exports = (deployer) => {

  deployer.deploy(UserController)
  .then(() => {
    return UserController.deployed()
  })
  .then(userCtrl => {
    userCtrl.setManagerAddr(ContractManager.address) 

    return Promise.all([
      ContractManager.deployed(),
      UserStorage.deployed(),
    ])
  })
  .then(([manager, storage]) => {
    return Promise.all([
      manager.setAddress("UserController", UserController.address),
      storage.setControllerAddr(UserController.address),
    ])
  })

}
