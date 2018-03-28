// client/pages/profile.js

import { withRouter } from 'next/router'

import { Page, Center } from '../components/Layout'
import Avatar from '../components/Avatar'
import TweetList from "../components/TweetList"
import Footer from "../components/Footer"

import { getUserIdFromUsername, getUserInfo } from '../web3/users'
import { getTweetIdsFromUser, getTweetInfo, loadTweetsFromTweetPromises } from '../web3/tweets'

const AVATAR_SIZE = 113

class ProfilePage extends React.Component {
  state = {
    profile: {},
    tweets: [],
  }

  async componentDidMount() {
    const { router } = this.props
    const userId = await getUserIdFromUsername(router.query.u)

    this.loadProfile(userId)
    this.loadTweets(userId)
  }

  loadProfile = async (userId) => {
    const profile = await getUserInfo(userId)

    this.setState({
      profile,
    })
  }

  loadTweets = async (userId) => {
    const tweetIds = await getTweetIdsFromUser(userId)

    const tweetPromises = tweetIds.map(tweetId => {
      return getTweetInfo(tweetId)
    })

    const tweets = await loadTweetsFromTweetPromises(tweetPromises)

    this.setState({
      tweets,
    })
  }

  render() {
    const { profile, tweets } = this.state
    const { username, firstName, lastName, bio, gravatarEmail } = profile

    return (
      <Page>
        <Center style={{
          maxWidth: 560, 
        }}>
          {username && (
            <div>
              <div className="profile-top">
                <div className="info">
                  <h1>
                    {firstName} {lastName}
                  </h1>
                  <p className="username">
                    @{username}
                  </p>
                  <p className="desc">
                    {bio}
                  </p>
                </div>
                <Avatar 
                  size={AVATAR_SIZE} 
                  email={gravatarEmail}
                />
              </div>

              <h2>
                {firstName}'s tweets ({tweets.length})
              </h2>
              <TweetList tweets={tweets} />
            </div>
          )}

        </Center>

        <Footer solid={true} />

        <style jsx>{`
          .profile-top {
            margin: 40px 0;
          }
          .info {
            display: inline-block;
            width: calc(100% - ${AVATAR_SIZE}px);
            vertical-align: top;
          }
          h1 {
            font-size: 30px;
            font-weight: 500;
          }
          .username {
            font-size: 17px;
            font-weight: 400;
            margin: 7px 0;
          }
          .desc {
            font-size: 19px;
            font-weight: 400;
            margin-top: 22px;
          }

          h2 {
            font-size: 18px;
            font-weight: 600;
            margin-top: 70px;
          }
        `}</style>

      </Page>
    )
  }
}

export default withRouter(ProfilePage)
