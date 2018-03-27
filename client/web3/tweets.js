// client/web3/tweets.js

import { eth, getInstance } from './provider'

import TweetStorage from "./artifacts/TweetStorage.json"
import TweetController from "./artifacts/TweetController.json"

import { getUserInfo } from './users'

export const createTweet = async (text) => {
  const controller = await getInstance(TweetController) 
  const addresses = await eth.getAccounts()

  const result = await controller.createTweet(text, {
    from: addresses[0],
  })

  return result
}

export const getTweetInfo = async (tweetId) => {
  const storage = await getInstance(TweetStorage)
  const tweet = await storage.tweets.call(tweetId)

  const [id, text, userId, postedAt] = tweet

  // Parse the data to make it look nice:
  return {
    id: parseInt(id),
    userId: parseInt(userId),
    text,
    postedAt: parseInt(postedAt),
  }
}

export const getTweetIdsFromUser = async (userId) => {
  const storage = await getInstance(TweetStorage)
  const tweetIds = await storage.getTweetIdsFromUser.call(userId)

  return tweetIds.map(tweetId => parseInt(tweetId))
}

export const loadTweetsFromTweetPromises = async (tweetPromises) => {
  const tweets = await Promise.all(tweetPromises)

  const userPromises = tweets.map(tweet => {
    const { userId } = tweet
    return getUserInfo(userId)
  })

  const users = await Promise.all(userPromises)

  return tweets.map((tweet, index) => {
    return {
      user: users[index],
      ...tweet,
    }
  })
}

export const getLatestTweetIds = async (amount = 5, page = 1) => {
  const storage = await getInstance(TweetStorage)

  const numTweets = await storage.getNumTweets.call()
  const tweetIdPromises = []

  const lastIndex = numTweets - 1 // Latest
  const pageIndex = page - 1
  const startIndex = lastIndex - (amount * pageIndex)
  const maxIndex = startIndex - amount

  for (let i = startIndex; i > maxIndex; i--) {
    if (i < 0) break

    tweetIdPromises.push(storage.tweetIds(i))
  }

  const tweetIds = await Promise.all(tweetIdPromises)

  return tweetIds
}
