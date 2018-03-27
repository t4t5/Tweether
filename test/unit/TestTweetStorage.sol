// test/unit/TestTweetStorage.sol

pragma solidity ^0.4.19;

import "truffle/Assert.sol";
import "../../contracts/tweets/TweetStorage.sol";

contract TestTweetStorage {
  TweetStorage tweetStorage;

  function TestTweetStorage() public {
    tweetStorage = new TweetStorage();
    tweetStorage.setControllerAddr(this);
  }

  function testCreateTweet() public {
    uint _userId = 1;
    uint _expectedTweetId = 1;

    Assert.equal(
      tweetStorage.createTweet(_userId, "Hello world!"), 
      _expectedTweetId, 
      "Should create tweet with ID 1"
    );
  }
}
