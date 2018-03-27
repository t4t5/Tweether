// test/integration/tweets.js

const TweetStorage = artifacts.require('TweetStorage')
const TweetController = artifacts.require('TweetController')
const UserController = artifacts.require("UserController")

const utils = require('../utils')
const { assertVMException } = utils

contract('tweets', () => {

  before(async () => {
    const userCtrl = await UserController.deployed();
    await userCtrl.createUser(
      "t4t5",
      "Tristan",
      "Edwards",
      "I like building stuff",
      "example@example.com"
    );
  });

  it("can create tweet with controller", async () => {
    const controller = await TweetController.deployed()

    const tx = await controller.createTweet("Hello world!")

    assert.isOk(tx)
  })

  it("can't create tweet without controller", async () => {
    const storage = await TweetStorage.deployed()

    try {
      const tx = await storage.createTweet(1, "tristan")
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  })

  it("can get tweet", async () => {
    const storage = await TweetStorage.deployed()

    const tweet = await storage.tweets.call(1) // Get the data
    const [tweetId, text, userId] = tweet // Destructure the data

    // Check if the different parts contain the expected values:
    assert.equal(parseInt(tweetId), 1)
    assert.equal(text, "Hello world!")
    assert.equal(parseInt(userId), 1)
  })

  it("can get all tweets IDs from user", async () => {
    const storage = await TweetStorage.deployed()

    const userId = 1
    const ids = await storage.getTweetIdsFromUser.call(userId)

    const expectedTweetId = 1

    assert.isOk(Array.isArray(ids))
    assert.equal(ids[0], expectedTweetId)
  })

  it("can get tweet ID based on index", async () => {
    const storage = await TweetStorage.deployed()

    const tweetId = await storage.tweetIds.call(0)

    assert.equal(tweetId, 1)
  })

})
