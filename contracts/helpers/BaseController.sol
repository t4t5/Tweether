// contracts/helpers/BaseController.sol

pragma solidity ^0.4.19;

import './Owned.sol';

contract BaseController is Owned {
  address managerAddr;

  function setManagerAddr(address _managerAddr) public onlyOwner {
    managerAddr = _managerAddr; 
  }

}
