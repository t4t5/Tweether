// contracts/helpers/BaseStorage.sol

pragma solidity ^0.4.19;

import './Owned.sol';

contract BaseStorage is Owned {
  address public controllerAddr;

  modifier onlyController() {
    require(msg.sender == controllerAddr);
    _;
  }

  function setControllerAddr(address _controllerAddr) public onlyOwner {
    controllerAddr = _controllerAddr; 
  }
}
