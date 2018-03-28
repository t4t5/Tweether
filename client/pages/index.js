// client/pages/index.js

import { Page, Center } from "../components/Layout"
import Button from "../components/Button"
import MetaMaskIcon from "../icons/metamask.svg"
import Modal from "../components/Modal"
import RegistrationForm from "../components/RegistrationForm"
import LockedMetaMask from "../components/LockedMetaMask"
import Footer from "../components/Footer"

import { eth } from '../web3/provider'
import { getLoggedInUserId, noAccount } from "../web3/users"
import Router from 'next/router'

const SVGMask = () => (
  <svg width="0" height="0">
    <defs>
      <clipPath 
        id="landing-transition" 
        clipPathUnits="objectBoundingBox"
      >
        <polygon 
          points="0 0, 0.65 0, 0.45 1, 0 1"
        />
      </clipPath>
    </defs>
  </svg>
)

export default class IndexPage extends React.Component {
  state = {
    showRegisterModal: false,
    mmStatus: null,
  }

  toggleRegisterModal = async () => {
    const { showRegisterModal } = this.state

    this.setState({
      showRegisterModal: !showRegisterModal,
    })
  }

  async componentDidMount() {
    this.detectMetaMask()
  }

  async getUser() {
    const userId = await getLoggedInUserId() 

    if (userId) {
      window.location.href = "/home"
    }
  }

  async detectMetaMask() {
    if (typeof web3 === "undefined") {
      return this.setState({
        mmStatus: "none",
      })
    }

    const { mmStatus } = this.state

    if (mmStatus === "unlocked") return

    const interval = setInterval(async () => {
      const addresses = await eth.getAccounts()
      const account = addresses[0]

      if (account) {
        this.setState({
          mmStatus: "unlocked",
        })

        this.getUser()
        clearInterval(interval)
      } else {
        this.setState({
          mmStatus: "locked",
        })
      }
    }, 1000);
  }

  render() {
    const { showRegisterModal, mmStatus } = this.state

    return (
      <Page>
        <SVGMask />
        <div className="bg" />

        <Center verticalCenter={true}>
          <h2>
            A <mark>decentralized</mark>, <mark>uncensorable</mark> Twitter clone built on Ethereum
          </h2>

          <div className="right-side">

            {(mmStatus === "none") && (
              <div>
                <p>
                  You need a wallet like MetaMask in order to use Tweether.
                </p>

                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">
                  <Button style={{
                    marginTop: 20, 
                  }}>
                    Download MetaMask
                  </Button>
                </a>
              </div>
            )}

            {(mmStatus === "locked") && (
              <LockedMetaMask />
            )}

            {(mmStatus === "unlocked") && (
              <div>
                <Button style={{
                  paddingLeft: 64, 
                }} onClick={this.toggleRegisterModal}>
                  <MetaMaskIcon />
                  Create your account
                </Button>

                <div className="disclaimer">
                  <p>
                    MetaMask will automatically open and ask you to confirm a transaction.
                  </p>
                  <p>
                    Please note that creating an account on the Ethereum blockchain costs a small amount of Ether.
                  </p>
                </div>
              </div>
            )}

          </div>
        </Center>

        {showRegisterModal && (
          <Modal
            onClose={this.toggleRegisterModal}
          >
            <RegistrationForm 
              onClose={this.toggleRegisterModal}
            />
          </Modal>
        )}

        <Footer />

        <style jsx global>{`
          html, body {
            min-height: 100%;
          }
          body {
            background-color: #262740 !important;
            background-image: url("/static/images/landing-bg.jpg");
            background-size: cover;
            background-position: center center;
          }
        `}</style>

        <style jsx>{`
          .bg {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #5d62b0
            opacity: 0.9;
            height: 100%;
            -webkit-clip-path: url("#landing-transition");
            clip-path: url("#landing-transition");
            will-change: transform; /* For Safari */
          }
          h2 {
            font-size: 50px;
            color: #FFFFFF;
            line-height: 78px;
            position: relative;
            text-transform: uppercase;
            max-width: 520px;
            display: inline-block;
          }
          mark {
            color: inherit;
            background-color: #9F99EC;
            padding: 0 7px;
          }
          .right-side {
            float: right;
            position: relative;
            max-width: 320px;
            text-align: center;
            margin-top: 120px;
          }
          .right-side :global(button svg) {
            position: absolute;
            margin-left: -46px;
            margin-top: -8px;
          }
          .right-side :global(p) {
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            line-height: 23px;
            font-weight: 400;
            margin-top: 23px;
          }
        `}</style>
      </Page>
    )
  }
}
