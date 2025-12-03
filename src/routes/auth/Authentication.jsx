// src/routes/auth/Authentication.jsx
import { useState } from 'react';
import './auth.css';
import axios from 'axios';           // ⬅️ add this import from 'axios';
import Login from './Login';
import Register from './Register';

const API_BASE_URL = 'http://localhost:8000'; // <-- backend

function Authentication({ setIsLoggedIn, setUserUsername }) {
  // true => Sign In, false => Sign Up
  const [_switchBoolean, setSwitchBoolean] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = () => {
    setSwitchBoolean(true);
  };

  const handleSignUpClick = () => {
    setSwitchBoolean(false);
  };

  // La soumission réelle (appel API) sera faite dans les tasks suivantes
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (_switchBoolean) {
      // 🔹 MODE SIGN IN → /login
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      setUserUsername(username);
      setIsLoggedIn(true);
    } else {
      // 🔹 MODE SIGN UP → /register
      await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username,
          password,
        }
      );

      // Après l'inscription, on repasse en mode Sign In
      setSwitchBoolean(true);
      // Optionnel : tu peux vider le password pour forcer à le retaper
      setPassword('');
    }
  } catch (error) {
    console.error(
      'Authentication error:',
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${_switchBoolean ? 'active' : ''}`}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${!_switchBoolean ? 'active' : ''}`}
            onClick={handleSignUpClick}
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
  );
}

export default Authentication;