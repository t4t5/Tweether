// client/components/Header.js

import Link from "next/link"
import Head from "next/head"

import { Center } from "./Layout"
import Logotype from "../icons/logotype.svg"
import Logomark from "./Logomark"
import Nav from "./Nav"
import Modal from "./Modal"
import TweetComposer from "./TweetComposer"

import { eth } from '../web3/provider'
import { getLoggedInUserId, getUserInfo, noAccount } from "../web3/users"

export default class Header extends React.Component {
  state = {
    loggedIn: false,
    userInfo: {},
    showComposeModal: false,
  }

  toggleComposeModal = () => {
    const { showComposeModal } = this.state

    this.setState({
      showComposeModal: !showComposeModal,
    })
  }

  fixMobile() {
    if ('ontouchstart' in document.documentElement) {
      // Allow clickOutide:
      document.body.style.cursor = 'pointer';

      // Allow :active styles on mobile devices:
      document.addEventListener("touchstart", function(){}, true);
    }
  }

  async componentDidMount() {
    this.fixMobile()
    this.detectMetaMask()

    const hasNoAccounts = await noAccount()
    if (hasNoAccounts) return

    this.getUserInfo()
  }

  async getUserInfo() {
    const userId = await getLoggedInUserId() 

    try {
      const userInfo = await getUserInfo(userId) 

      this.setState({
        loggedIn: true,
        userInfo,
      })
    } catch (err) {
      console.error("Couldn't find logged in user", err)
    }
  }

  async detectMetaMask() {
    const { loggedIn } = this.state

    if (loggedIn) return

    const interval = setInterval(async () => {
      const addresses = await eth.getAccounts()
      const account = addresses[0]

      if (account) {
        this.getUserInfo()
        clearInterval(interval)
      } else {
        this.setState({
          loggedIn: false,
        })
      }
    }, 1000);
  }

  render() {
    const { loggedIn, userInfo, showComposeModal } = this.state
    const homeURL = loggedIn ? "/home" : "/"

    return (
      <header>
        <Head>
          <meta 
            name="viewport" 
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" 
          />
        </Head>

        <Center>
          <Link href={homeURL}>
            <a>
              <Logotype className="logotype" />
              <Logomark />
            </a>
          </Link>

          {loggedIn && (
            <Nav
              userInfo={userInfo}
              toggleComposeModal={this.toggleComposeModal}
            />
          )}
        </Center>

        {showComposeModal && (
          <Modal
            onClose={this.toggleComposeModal}
          >
            <TweetComposer onClose={this.toggleComposeModal} />
          </Modal>
        )}

        <style jsx>{`
          header {
            background-color: #FFFFFF;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.14);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
          header :global(.logomark) {
            display: none;
          }

          @media (max-width: 700px) {
            header :global(.logomark) {
              display: block;
            }
            header :global(.logotype) {
              display: none;
            }
          }
        `}</style>
      </header>
    )
  }
}
