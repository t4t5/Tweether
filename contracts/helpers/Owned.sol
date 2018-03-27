// contracts/helpers/Owned.sol

pragma solidity ^0.4.19;

contract Owned {
  address public ownerAddr;

  function Owned() internal {
    ownerAddr = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == ownerAddr);
    _;
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0));

    ownerAddr = _newOwner;
  }

}
