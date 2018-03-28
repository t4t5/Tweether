// client/components/TweetComposer.js

import { createTweet } from '../web3/tweets'
import Button from './Button'
import { toast } from 'react-toastify'

export default class ComposeModal extends React.Component {
  state = {
    text: "",
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  }

  post = async () => {
    const { text } = this.state
    const { onClose } = this.props

    let toastId = null

    onClose()

    try {
      toastId = toast.info("Your tweet is being posted. This will take a couple of seconds...")

      await createTweet(text)

      toast.update(toastId, { 
        render: "Your tweet has been posted!",
        type: toast.TYPE.SUCCESS,
        autoClose: 4000,
      })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      toast.update(toastId, { 
        render: "Sorry, we couldn't post your tweet!",
        type: toast.TYPE.ERROR,
        autoClose: 4000,
      })
    }
  }

  render() {
    const { onClose } = this.props
    const { text } = this.state

    const disabled = (text === "")

    return (
      <div>
        <h3>
          Post a new tweet
        </h3>

        <textarea 
          value={text} 
          onChange={this.handleChange} 
          autoFocus={true}
          maxLength={140}
        />

        <Button 
          onClick={this.post} 
          disabled={disabled}
          style={{
            marginTop: 12,
            float: 'right',
          }}
        >
          Post tweet
        </Button>

        <style jsx>{`
          textarea {
            box-sizing: border-box;
            margin: 0px;
            margin-top: 10px;
            border: 2px solid rgba(107,108,139,0.58);
            border-radius: 7px;
            width: 100%;
            padding: 11px;
            font-size: 16px;
          }
          textarea:focus {
            outline: none;
          }
        `}</style>
      </div>
    ) 
  }
}
