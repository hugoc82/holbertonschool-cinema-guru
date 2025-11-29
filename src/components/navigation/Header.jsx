import './navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    // enlever le token et mettre l’état à false
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          className="navbar-avatar"
          src="https://picsum.photos/100/100"
          alt="User avatar"
        />
        <p className="navbar-username">
          Welcome{userUsername ? `, ${userUsername}` : ''} 👋
        </p>
      </div>

      <div className="navbar-right" onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span>
      </div>
    </nav>
  )
}

export default Header
