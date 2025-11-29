import './dashboard.css'
import Header from '../../components/navigation/Header'
import SideBar from '../../components/navigation/SideBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './HomePage'
import Favorites from './Favorites'
import WatchLater from './WatchLater'

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      <div className="dashboard-page">
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />

        <div className="dashboard-layout">
          <SideBar />

          <div className="dashboard-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlater" element={<WatchLater />} />
              <Route
                path="*"
                element={<Navigate to="/home" replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard
