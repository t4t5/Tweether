// client/components/TweetList.js

import Tweet from './Tweet'

export default ({ tweets = [] }) => (
  <ul className="feed">
    {!tweets.length && <p>No tweets yet.</p>}

    {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}

    <style jsx>{`
      .feed {
        background-color: white;
        border: 1px solid rgba(0,0,0,0.11);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 3px;
        max-width: 560px;
        margin: 20px auto;
      }
      p {
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </ul>
)
