import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ProfilProtected() {
  let { role , id } = useParams()
  function handleFormSubmit() {
    axios
      .get(`/user/${role}-protected/${id}`)
      .then((response) => {
        let { role } = response.data
        console.log(role)
        if (role) {
          this.props.history.push(`/${role}-protected`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    handleFormSubmit()
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default ProfilProtected
