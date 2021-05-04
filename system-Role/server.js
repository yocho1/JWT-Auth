const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const { success, error } = require('consola')
const { connect } = require('mongoose')
const cookieParser = require('cookie-parser')

// Bring In the app constants
const { DB, PORT } = require('./config')
const auth =require('./middleware/auth')

// initialize the application

const app = express()

// middleware
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(cookieParser())

// user Router Middleware
app.use('/user', require('./routes/userRouter'))
app.use('*', auth)

const startApp = async () => {
  try {
    // connection with DB
    await connect(DB, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    })
    // Start Listen for the server on port PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    )
  } catch (err) {
    error({
      message: `Unable to connect with the Database \n${err}`,
      badge: true,
    })
  }
}

startApp()
