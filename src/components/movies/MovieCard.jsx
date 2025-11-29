import './movies.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons'

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchLater, setIsWatchLater] = useState(false)

  const movieId = movie?.imdbId || movie?.imdb_id || movie?.id

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken || !movieId) return

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const fetchStatuses = async () => {
      try {
        const [favRes, wlRes] = await Promise.all([
          axios.get('http://localhost:8000/api/titles/favorite/', {
            headers,
          }),
          axios.get('http://localhost:8000/api/titles/watchlater/', {
            headers,
          }),
        ])

        const favorites = favRes.data || []
        const watchlater = wlRes.data || []

        const matchId = (item) =>
          (item.imdbId || item.imdb_id || item.id) === movieId

        setIsFavorite(favorites.some(matchId))
        setIsWatchLater(watchlater.some(matchId))
      } catch (error) {
        console.error('Failed to fetch favorite/watchlater lists:', error)
      }
    }

    fetchStatuses()
  }, [movieId])

  const handleClick = async (type) => {
    if (!movieId) return

    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const isFavType = type === 'favorite'
    const current = isFavType ? isFavorite : isWatchLater

    const url = `http://localhost:8000/api/titles/${type}/${movieId}`

    try {
      if (current) {
        // déjà dans la liste -> DELETE
        await axios.delete(url, { headers })
        if (isFavType) {
          setIsFavorite(false)
        } else {
          setIsWatchLater(false)
        }
      } else {
        // pas encore -> POST
        await axios.post(url, {}, { headers })
        if (isFavType) {
          setIsFavorite(true)
        } else {
          setIsWatchLater(true)
        }
      }
    } catch (error) {
      console.error('Failed to toggle title:', error)
    }
  }

  const genres =
    movie?.genres ||
    movie?.genre ||
    []

  const synopsis = movie?.synopsis || movie?.description || ''

  return (
    <li className="movie-card">
      <div className="movie-card-header">
        <h3 className="movie-title">{movie?.title || 'Untitled'}</h3>

        <div className="movie-actions">
          <FontAwesomeIcon
            icon={faHeart}
            className={`movie-icon ${isFavorite ? 'active' : ''}`}
            onClick={() => handleClick('favorite')}
          />
          <FontAwesomeIcon
            icon={faClock}
            className={`movie-icon ${isWatchLater ? 'active' : ''}`}
            onClick={() => handleClick('watchlater')}
          />
        </div>
      </div>

      {synopsis && (
        <p className="movie-synopsis">
          {synopsis}
        </p>
      )}

      {Array.isArray(genres) && genres.length > 0 && (
        <ul className="movie-genres">
          {genres.map((g, index) => (
            <li key={g?.id ?? g ?? index}>{g.name || g}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default MovieCard
