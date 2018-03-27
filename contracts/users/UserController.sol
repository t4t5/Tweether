// contracts/users/UserController.sol

pragma solidity ^0.4.19;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import './UserStorage.sol';

contract UserController is BaseController {

  function createUser(
    bytes32 _username, 
    bytes32 _firstName, 
    bytes32 _lastName,
    string _bio,
    string _gravatarEmail
  ) public returns(uint _newUserId) {
    ContractManager _manager = ContractManager(managerAddr);

    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _storage = UserStorage(_userStorageAddr); 

    require(_storage.addresses(msg.sender) == 0);
    require(_storage.usernames(_username) == 0);

    return _storage.createUser(
      msg.sender,
      _username, 
      _firstName, 
      _lastName, 
      _bio,
      _gravatarEmail
    );
  }

}
