// client/pages/home.js

import { Page, Center } from "../components/Layout"
import { getLatestTweetIds, getTweetInfo, loadTweetsFromTweetPromises } from '../web3/tweets'

import TweetList from '../components/TweetList'

export default class HomePage extends React.Component {
  state = { 
    tweets: [],
  }

  componentDidMount() {
    this.loadLatestTweets()
  }

  loadLatestTweets = async () => {
    const tweetIds = await getLatestTweetIds()

    const tweetPromises = tweetIds.map(tweetId => {
      return getTweetInfo(tweetId)
    })

    const tweets = await loadTweetsFromTweetPromises(tweetPromises)

    this.setState({
      tweets,
    })
  }

  render() {
    const { tweets } = this.state

    return (
      <Page>
        <Center>
          <h2>
            Latest tweets
          </h2>

          <TweetList tweets={tweets} />
        </Center>

        <style jsx>{`
          h2 {
            font-size: 16px;
            color: rgba(84,83,98,0.64);
            letter-spacing: 0.5px;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 16px;
            margin-top: 4px;
          }
        `}</style>
      </Page>
    )
  }
}
