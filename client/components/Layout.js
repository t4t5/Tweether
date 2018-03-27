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

export const Center = ({ children, style }) => (
  <div style={style}>
    {children}

    <style jsx>{`
      div {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
      }
    `}</style>
  </div>
)

