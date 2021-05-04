import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState('')

  const [client, setClient] = useState([])

  const getInfos = async () => {
    const {data} = await axios.get('http://localhost:2000')
    
      if (data) {
        setIsAuth(data.data.isAuth)
        setRole(data.data.role)
      }
      console.log(isAuth, role)
      console.log(data)
    
  }

  useEffect(() => {
    getInfos()
  }, [])

  return (
    <UserContext.Provider value={{ isAuth, role }}>
      {children}
    </UserContext.Provider>
  )
}
