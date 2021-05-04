const User = require('../models/userModel')
const Joi = require('joi')
var bcrypt = require('bcryptjs')
const { SECRET } = require('../config')
const jwt = require('jsonwebtoken')

// register the user (Admin, User , Tech)

const userRegister = async (userDets, role, res) => {
  try {
    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email)
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      })
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12)
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role,
    })

    await newUser.save()
    return res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      success: true,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to create your account.',
      success: false,
    })
  }
}
const userLogin = async (userCreds, res) => {
  let { email, password } = userCreds.body
  // First Check if the username is in the database
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({
      message: 'Email is not found. Invalid login credentials.',
      success: false,
    })
  }
  console.log("testt"+ user)
  // We will check the role
  // if (user.role !== '') {
  //   return res.status(403).json({
  //     message: 'Please make sure you are logging in from the right portal.',
  //     success: false,
  //   })
  // }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      SECRET,
      { expiresIn: '7 days' }
    )

    res.cookie('auth_token', token, {
      httpOnly: true,
      // path: '/user',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    let result = {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      token: token,
      expiresIn: 168,
    }

    return res.status(200).json({
      ...result,
      message: 'Hurray! You are now logged in.',
      success: true,
    })
  } else {
    return res.status(403).json({
      message: 'Incorrect password.',
      success: false,
    })
  }
}

// email validation
const validateEmail = async (email) => {
  let user = await User.findOne({ email })
  return user ? false : true
}

// serializeUser
const serializeUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

const registerValidations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(48).trim(),
    lastName: Joi.string().required().min(3).max(48).trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

module.exports = {
  userRegister,
  userLogin,
  serializeUser,
}
