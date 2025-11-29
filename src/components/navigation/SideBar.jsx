import './navigation.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faHeart,
  faClockRotateLeft,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import Activity from '../Activity'

const SideBar = () => {
  const [selected, setSelected] = useState('home')
  const [small, setSmall] = useState(true)
  const [activities, setActivities] = useState([])
  const [showActivities, setShowActivities] = useState(false)

  const navigate = useNavigate()

  const setPage = (pageName) => {
    setSelected(pageName.toLowerCase())

    switch (pageName) {
      case 'home':
        navigate('/home')
        break
      case 'favorites':
        navigate('/favorites')
        break
      case 'watchlater':
        navigate('/watchlater')
        break
      default:
        break
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/activity')
      .then((response) => {
        setActivities(response.data || [])
      })
      .catch((error) => {
        console.error('Failed to fetch activities:', error)
      })
  }, [])

  return (
    <nav className={`sidebar ${small ? 'sidebar-small' : ''}`}>
      {/* Navigation principale */}
      <ul className="sidebar-nav">
        <li
          className={selected === 'home' ? 'active' : ''}
          onClick={() => setPage('home')}
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </li>

        <li
          className={selected === 'favorites' ? 'active' : ''}
          onClick={() => setPage('favorites')}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>Favorites</span>
        </li>

        <li
          className={selected === 'watchlater' ? 'active' : ''}
          onClick={() => setPage('watchlater')}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span>Watch Later</span>
        </li>
      </ul>

      {/* Activités récentes */}
      <div className="sidebar-activities-section">
        <div
          className="sidebar-activities-header"
          onClick={() => setShowActivities((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBell} />
          <span>Recent activity</span>
        </div>

        {showActivities && (
          <ul className="sidebar-activities">
            {activities.slice(0, 10).map((activity, index) => (
              <Activity
                key={activity.id ?? index}
                activity={activity}
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default SideBar
