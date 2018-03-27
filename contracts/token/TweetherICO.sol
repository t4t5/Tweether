// contracts/token/TweetherICO.sol

pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./TweetherToken.sol";

contract TweetherICO {
  using SafeMath for uint256;

  TweetherToken token;

  uint256 public RATE = 1000; // 1 ETH = 1000 TWE

  function TweetherICO(address _tokenAddr) public {
    token = TweetherToken(_tokenAddr);  
  }

  function () public payable {
    uint256 _amount = _getTokenAmount(msg.value);

    token.transfer(msg.sender, _amount);
  }

  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
    return _weiAmount.div(10 ** 18).mul(RATE);
  }

}
