// client/components/Header.js

import Link from "next/link"

import { Center } from "./Layout"
import Logotype from "../icons/logotype.svg"
import Nav from "./Nav"
import Modal from "./Modal"
import TweetComposer from "./TweetComposer"

import { getLoggedInUserId, getUserInfo } from "../web3/users"

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

  async componentDidMount() {
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

  render() {
    const { loggedIn, userInfo, showComposeModal } = this.state

    return (
      <header>
        <Center>
          <Link href="/">
            <a className="logotype">
              <Logotype />
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
        `}</style>
      </header>
    )
  }
}
