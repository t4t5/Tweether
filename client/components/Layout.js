// client/components/Layout.js

import Head from 'next/head'
import Header from "./Header"
import Toast from "./Toast.js"

import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export const Page = ({ children }) => (
  <div>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
        {/* Import CSS for nprogress */}
        <link 
          rel='stylesheet' 
          type='text/css' 
          href='/static/nprogress.css' 
        />
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
  <div 
    style={style} 
    data-vertical={verticalCenter}
  >
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
      @media (max-width: 1050px) {
        div[data-vertical="true"] {
          position: relative;
          margin-top: 30px;
          transform: none;
          left: auto;
          max-width: 100%;
          min-width: 0;
        }
      }
      @media (max-width: 500px) {
        div[data-vertical="true"] {
          padding: 10px;
          max-width: calc(100% - 20px);
          margin-top: 0;
        }
      }
    `}</style>

    <style jsx global>{`
      #nprogress .spinner {
        display: none !important;
      }
      #nprogress .bar {
        background: #9e99ec;
        height: 3px;
      }
      #nprogress .bar .peg {
        box-shadow: 0 0 10px #ffda9f, 0 0 5px #ffdca5;
      }
    `}</style>
  </div>
)

