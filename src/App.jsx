// src/App.jsx
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './routes/dashboard/Dashboard'
import Authentication from './routes/auth/Authentication'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userUsername, setUserUsername] = useState('')

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return

    axios
      .post(
        'http://localhost:8000/api/auth/',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setIsLoggedIn(true)
        setUserUsername(response.data?.username || '')
      })
      .catch(() => {
        setIsLoggedIn(false)
        setUserUsername('')
      })
  }, [])

  return isLoggedIn ? (
    <Dashboard
      userUsername={userUsername}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    <Authentication
      setIsLoggedIn={setIsLoggedIn}
      setUserUsername={setUserUsername}
    />
  )
}

export default App
