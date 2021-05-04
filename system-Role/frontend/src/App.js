import React from 'react'
import { UserProvider } from './UserContext'
import Routes from './routes/Routes'

function App(props) {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  )
}

export default App
