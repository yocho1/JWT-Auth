const router = require('express').Router()
const auth = require('../middleware/auth')
const checkRole = require('../middleware/roles')
const { getUser, getAll } = require('../middleware/getUsers')
// bring in the User Registration function
const {
  userRegister,
  userLogin,
  serializeUser,
} = require('../controllers/userCtrl')
// users Registration route

router.post('/register-user', async (req, res) => {
  await userRegister(req.body, 'user', res)
})

// admin Registration route

router.post('/register-admin', async (req, res) => {
  await userRegister(req.body, 'admin', res)
})

// tech Registration route

router.post('/register-tech', async (req, res) => {
  await userRegister(req.body, 'tech', res)
})

// users Login route

router.post('/login', async (req, res) => {
  await userLogin(req, res)
})

// admin Login route

// router.post('/login-admin', async (req, res) => {
//   await userLogin(req, res)
// })

// // tech Login route

// router.post('/login-tech', async (req, res) => {
//   await userLogin(req, res)
// })

// profile route

router.get('/profile', async (req, res) => {
  return res.json(serializeUser(req.user))
})

// users Protected route

router.get('/user-protected/:id', checkRole(['user']), getUser)

// admin Protected route

router.get('/admin-protected/:id', checkRole(['admin']), getAll)

// tech Protected route

router.get('/tech-protected/:id', checkRole(['tech']), getUser)

module.exports = router
