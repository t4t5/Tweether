// client/web3/users.js

import Web3 from "web3"

const {
  utils: {
    hexToString,
  },
} = Web3

import { eth, getInstance } from './provider'

import UserStorage from "./artifacts/UserStorage.json"
import UserController from "./artifacts/UserController.json"

export const getLoggedInUserId = async () => {
  const addresses = await eth.getAccounts()

  if (!addresses) return

  const storage = await getInstance(UserStorage)
  const userId = await storage.addresses.call(addresses[0])

  return parseInt(userId)
}

export const getUserInfo = async (userId) => {
  const storage = await getInstance(UserStorage)
  const profile = await storage.profiles.call(userId)

  const [
    id, 
    username, 
    firstName, 
    lastName, 
    bio, 
    gravatarEmail, 
  ] = profile
  
  if (!parseInt(id)) throw "Couldn't find user!"

  return {
    id: parseInt(id),
    username: hexToString(username),
    firstName: hexToString(firstName),
    lastName: hexToString(lastName),
    bio,
    gravatarEmail,
  }
}

export const createUser = async (...params) => {
  const controller = await getInstance(UserController)
  const addresses = await eth.getAccounts()

  const result = await controller.createUser(...params, {
    from: addresses[0],
  })

  return result
} 

export const getUserIdFromUsername = async (username) => {
  const storage = await getInstance(UserStorage)
  const userId = await storage.usernames.call(username)

  return userId
}

