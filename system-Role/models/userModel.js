const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name!'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password!'],
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'tech'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', userSchema)
