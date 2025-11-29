import './dashboard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../../components/movies/MovieCard'

const Favorites = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}

    axios
      .get('http://localhost:8000/api/titles/favorite/', { headers })
      .then((response) => {
        const data = response.data || []
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.titles)
          ? data.titles
          : []
        setMovies(list)
      })
      .catch((error) => {
        console.error('Failed to load favorites:', error)
      })
  }, [])

  return (
    <div className="dashboard-page-content">
      <h1>Movies you like</h1>
      <ul>
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id ?? movie.imdbId ?? movie.imdb_id}
              movie={movie}
            />
          ))}
      </ul>
    </div>
  )
}

export default Favorites
