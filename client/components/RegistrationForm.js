// client/components/RegistrationForm.js

import Button from "./Button"
import { createUser } from "../web3/users"

const Input = ({ title, value, onChange }) => (
  <div>
    <label>
      {title}
    </label>

    <input value={value} onChange={onChange} />

    <style jsx>{`
      div {
        border-bottom: 1px solid rgba(0,0,0,0.13);
        margin: 0 -14px;
        padding: 0 14px;
      }
      div:first-of-type {
        border-top: 1px solid rgba(0,0,0,0.13);
      }
      label {
        font-size: 13px;
        color: rgba(81,81,112,0.66);
        text-transform: uppercase;
        display: block;
        margin-top: 8px;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        font-size: 17px;
        padding-top: 8px;
        padding-bottom: 13px;
        border: none;
      }
      input:focus {
        border: none;
        outline: none;
      }
    `}</style>
  </div>
)

export default class RegistrationForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    gravatarEmail: "",
    bio: "",
  }

  updateField = (fieldName, e) => {
    const newState = {}
    newState[fieldName] = e.target.value

    this.setState(newState)
  }

  createUser = async (e) => {
    e.preventDefault()

    // Some quick validation checks
    for (let key in this.state) {
      if (!this.state[key]) {
        return alert(`You must fill in your ${key}!`)
      }
    }

    const { firstName, lastName, username, bio, gravatarEmail } = this.state

    try {
      // Open the MetaMask modal:
      await createUser(username, firstName, lastName, bio, gravatarEmail)

      alert("Your user has been created!")
    } catch (err) {
      alert(`Sorry, we couldn't create your user: ${err}`)
    }
  }

  render() {
    const { onClose } = this.props

    return (
      <form onSubmit={this.createUser}>
        <h3>
          Create your account
        </h3>

        <Input 
          title="First name" 
          onChange={e => this.updateField("firstName", e)} 
        />

        <Input 
          title="Last name" 
          onChange={e => this.updateField("lastName", e)} 
        />

        <Input 
          title="Desired username" 
          onChange={e => this.updateField("username", e)} 
        />

        <Input 
          title="Gravatar email" 
          onChange={e => this.updateField("gravatarEmail", e)} 
        />

        <Input 
          title="Bio" 
          onChange={e => this.updateField("bio", e)} 
        />

        <footer>
          <Button onClick={this.createUser}>
            Create
          </Button>
        </footer>

        <style jsx>{`
          h3 {
            padding-bottom: 10px;
          }
          footer {
            text-align: right;
            padding-top: 16px;
          }
        `}</style>
      </form>
    )
  }
}
