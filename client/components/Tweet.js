// client/components/Tweet.js

import Link from "next/link"
import Moment from "react-moment"

import Avatar from "./Avatar"

export default ({ tweet }) => {
  const { text, user, postedAt } = tweet
  const { username, gravatarEmail } = user

  return (
    <div className="tweet">
      <Avatar size={42} email={gravatarEmail} />

      <div className="info">
        <div className="top">
          <Link href={`/profile?u=${username}`}>
            <a className="username">
              {username}
            </a>
          </Link>
          <time>
            <Moment fromNow ago unix>
              {postedAt}
            </Moment>
          </time>
        </div>

        <p>
          {text}
        </p>
      </div>

      <style jsx>{`
        .tweet {
          padding: 20px;
          border-bottom: 1px solid rgba(151,151,151,0.17);
        }
        .tweet:last-child {
          border-bottom: none;
        }
        .avatar {
          width: 42px;
          height: 42px;
          background-color: gray;
          border-radius: 50%;
          display: inline-block;
        }
        .info {
          display: inline-block;
          vertical-align: top;
          margin-left: 20px;
          width: calc(100% - 62px);
        }
        .top {
          display: flex;
        }
        a {
          font-size: 17px;
          color: #5D5D65;
          font-weight: 600;
          flex-grow: 1;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        p {
          font-size: 16px;
          color: #444448;
          line-height: 24px;
          margin-top: 6px;
        }
        time {
          font-size: 16px;
          color: rgba(68,68,72,0.45);
        }
      `}</style>
    </div>
  )
}
