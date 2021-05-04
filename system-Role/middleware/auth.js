const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const auth = (req, res, next) => {
  try {
    const token = req.cookies.auth_token
    console.log(token)
    if (token) {
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res
            .status(400)
            .clearCookie('auth_token')
            .json({ role: '', isAuth: false, msg: 'Invalid Authentication' })
        } else {
          req.user = user
          console.log(req.user)
          res.status(200).json({
            role: user.role,
            isAuth: true,
            msg: 'valid Authentication',
          })
          next()
        }
      })
      
    } else {
      res
        .status(400)
        .json({ role: '', isAuth: false, msg: 'Invalid Authentication' })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = auth
