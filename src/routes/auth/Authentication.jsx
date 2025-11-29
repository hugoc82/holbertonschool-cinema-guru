import { useState } from 'react'
import axios from 'axios'
import './auth.css'
import Login from './Login'
import Register from './Register'

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switchBoolean, setSwitchBoolean] = useState(true) // true = Login, false = Register
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSwitchToLogin = (event) => {
    event.preventDefault()
    setSwitchBoolean(true)
  }

  const handleSwitchToRegister = (event) => {
    event.preventDefault()
    setSwitchBoolean(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // empêcher le rechargement de page

    const endpoint = _switchBoolean ? '/api/auth/login' : '/api/auth/register'

    try {
      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        {
          username,
          password,
        }
      )

      // on suppose que le token est dans response.data.accessToken (ou similaire)
      const token =
        response.data?.accessToken ||
        response.data?.token ||
        response.data?.access_token

      if (token) {
        localStorage.setItem('accessToken', token)
      }

      // mettre à jour l'état global via les setters passés en props
      setUserUsername(username)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Authentication failed:', error)
      // en cas d’erreur, on reste déconnecté
      setIsLoggedIn(false)
      setUserUsername('')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-switch">
            <button
              type="button"
              className={
                'auth-switch-button' + (_switchBoolean ? ' active' : '')
              }
              onClick={handleSwitchToLogin}
            >
              Sign In
            </button>
            <button
              type="button"
              className={
                'auth-switch-button' + (!_switchBoolean ? ' active' : '')
              }
              onClick={handleSwitchToRegister}
            >
              Sign Up
            </button>
          </div>

          {_switchBoolean ? (
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          ) : (
            <Register
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default Authentication
