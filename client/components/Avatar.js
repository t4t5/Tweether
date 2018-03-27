// client/components/Avatar.js

import gravatarUrl from 'gravatar-url' 

import DefaultAvatar from '../icons/avatar.svg'

export default ({ email, size = 32 }) => {
  let url

  if (email) {
    url = gravatarUrl(email, {
      size: size * 2,
    })
  }

  return (
    <div className="avatar">
      {url
        ? <img src={url} />
        : <DefaultAvatar />
      }

      <style jsx>{`
        .avatar {
          display: inline-block;
          vertical-align: middle;
          width: ${size}px;
          height: ${size}px;
        }
        .avatar :global(svg) {
          width: 100%;
          height: 100%;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
