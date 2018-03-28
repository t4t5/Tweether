// client/components/Layout.js

import Head from 'next/head'
import Header from "./Header"
import Toast from "./Toast.js"

export const Page = ({ children }) => (
  <div>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
    </Head>

    <Header />

    <main>
      {children}
    </main>

    <Toast />

    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #efedf0;
        font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #6B6B8E;
      }
      main {
        padding-top: 80px;
      }
    `}</style>
  </div>
)

export const Center = ({ children, style, verticalCenter }) => (
  <div style={style} data-vertical={verticalCenter}>
    {children}

    <style jsx>{`
      div {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
      }
      @media (min-height: 500px) {
        div[data-vertical="true"] {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          min-width: 1000px;
        }
      }
    `}</style>
  </div>
)

