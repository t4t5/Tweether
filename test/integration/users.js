// test/integration/users.js

const web3 = require('web3')

// Get the hexToString function from web3:
const {
  utils: { hexToString },
} = web3

const UserStorage = artifacts.require('UserStorage')
const UserController = artifacts.require('UserController')

const utils = require('../utils')
const { assertVMException } = utils

contract('users', () => {

  it("can create user with controller", async () => {
    const controller = await UserController.deployed()

    const tx = await controller.createUser(
      "tristan",
      "Tristan",
      "Edwards",
      "I like building stuff",
      "example@example.com"
    )

    assert.isOk(tx)
  })

  it("can't create user without controller", async () => {
    const storage = await UserStorage.deployed()

    try {
      const tx = await storage.createUser(
        0x0,
        "tristan",
        "Tristan",
        "Edwards",
        "I like building stuff",
        "example@example.com"
      )
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  })
  
  it("can get user", async () => {
    const storage = await UserStorage.deployed()
    const userId = 1
    const userInfo = await storage.profiles.call(userId)
    const username = userInfo[1]

    assert.equal(hexToString(username), "tristan")
  });

})
