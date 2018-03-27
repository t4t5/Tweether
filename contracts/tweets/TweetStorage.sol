// contracts/tweets/TweetStorage.sol

pragma solidity ^0.4.19;

import '../helpers/BaseStorage.sol';

contract TweetStorage is BaseStorage {

  mapping(uint => Tweet) public tweets;
  mapping (uint => uint[]) public userTweetIds;
  uint[] public tweetIds;
  
  struct Tweet {
    uint id;
    string text;
    uint userId;
    uint postedAt;
  }

  uint latestTweetId = 0;

  function createTweet(uint _userId, string _text) public onlyController returns(uint) {
    latestTweetId++;

    tweets[latestTweetId] = Tweet(latestTweetId, _text, _userId, now);
    userTweetIds[_userId].push(latestTweetId);
    tweetIds.push(latestTweetId);

    return latestTweetId;
  }

  function getTweetIdsFromUser(uint _userId) view public returns(uint[]) {
    return userTweetIds[_userId];
  }

  function getNumTweets() view public returns(uint _numTweets) {
    return tweetIds.length;
  }

}
