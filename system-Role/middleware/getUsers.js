const Users = require('../models/userModel')

exports.getUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await Users.findById({ _id: id })
    if (!user) {
      return res.status(400).json({ msg: 'User Not Found' })
    }
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ msg: error })
  }
}

exports.getAll = async (req, res) => {

    try {
      const user = await Users.find()
      if (!user) {
        return res.status(400).json({ msg: 'User Not Found' })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(400).json({ msg: error })
    }
  }