// client/components/Nav.js

import Link from "next/link"
import Avatar from "./Avatar"
import ComposeIcon from "../icons/compose.svg"

export default ({ userInfo, toggleComposeModal }) => {
  const { firstName, lastName, username, gravatarEmail } = userInfo

  return (
    <nav>
      <button onClick={toggleComposeModal}>
        <ComposeIcon />
      </button>

      <Link href={`/profile?u=${username}`}>
        <a className="username">
          <Avatar 
            email={gravatarEmail} 
            style={{
              marginBottom: -2,
            }} 
          />
          <span className="name-only">
            {firstName} {lastName}
          </span>
        </a>
      </Link>

      <style jsx>{`
        nav {
          display: inline-block; 
          float: right;
        }
        nav button, 
        nav a {
          min-height: 33px;
          border: none;
          padding: 7px;
          text-align: center;
          border-radius: 24px;
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          margin: 0 10px;
          transition: background-color 0.1s;
          color: inherit;
        }
        nav button:hover, 
        nav a:hover {
          background-color: rgba(140,111,193,0.14);
        }
        nav button:focus {
          outline: none;
        }
        .username {
          font-size: 18px;
          text-decoration: none;
        }
        .username span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          margin-right: 10px;
        }
        nav :global(svg) {
          margin-bottom: -2px;
        }

        @media (max-width: 500px) {
          .username .name-only {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}
