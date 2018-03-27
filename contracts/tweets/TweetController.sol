// contracts/tweets/TweetController.sol

pragma solidity ^0.4.19;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import './TweetStorage.sol';
import "../users/UserStorage.sol";

contract TweetController is BaseController {

  function createTweet(string _text) public returns(uint) {
    ContractManager _manager = ContractManager(managerAddr);

    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _userStorage = UserStorage(_userStorageAddr);
    uint _userId = _userStorage.addresses(msg.sender);

    require(_userId != 0);

    address _tweetStorageAddr = _manager.getAddress("TweetStorage");
    TweetStorage _tweetStorage = TweetStorage(_tweetStorageAddr);

    return _tweetStorage.createTweet(_userId, _text);
  }

}
