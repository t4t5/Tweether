// contracts/users/UserStorage.sol

pragma solidity ^0.4.19;

import '../helpers/BaseStorage.sol';

contract UserStorage is BaseStorage {

  mapping(uint => Profile) public profiles;
  mapping (address => uint) public addresses;
  mapping (bytes32 => uint) public usernames; 

  struct Profile {
    uint id;
    bytes32 username;
    bytes32 firstName;
    bytes32 lastName;
    string bio;
    string gravatarEmail;
  }

  uint latestUserId = 0;
  
  function createUser(
    address _address,
    bytes32 _username,
    bytes32 _firstName,
    bytes32 _lastName,
    string _bio,
    string _gravatarEmail
  ) public onlyController returns(uint _newUserId) {
    latestUserId++;  

    profiles[latestUserId] = Profile(
      latestUserId, 
      _username,
      _firstName,
      _lastName,
      _bio,
      _gravatarEmail
    );

    addresses[_address] = latestUserId;
    usernames[_username] = latestUserId;

    return latestUserId;
  }

}
