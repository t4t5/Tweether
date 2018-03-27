// migrations/2_deploy_storage.js

const UserStorage = artifacts.require('UserStorage');
const TweetStorage = artifacts.require('TweetStorage');

module.exports = (deployer) => {
  deployer.deploy(UserStorage);
  deployer.deploy(TweetStorage); 
}
