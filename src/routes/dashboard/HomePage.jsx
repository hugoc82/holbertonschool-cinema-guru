import './dashboard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from '../../components/movies/Filter'
import MovieCard from '../../components/movies/MovieCard'
import Button from '../../components/general/Button'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [minYear, setMinYear] = useState(1970)
  const [maxYear, setMaxYear] = useState(2022)
  const [genres, setGenres] = useState([])
  const [sort, setSort] = useState('')
  const [title, setTitle] = useState('')
  const [page, setPage] = useState(1)

  const loadMovies = async (pageToLoad = 1, reset = false) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}

      const params = {
        minYear,
        maxYear,
        sort,
        title,
        page: pageToLoad,
      }

      if (genres.length > 0) {
        params.genres = genres.join(',')
      }

      const response = await axios.get(
        'http://localhost:8000/api/titles/advancedsearch',
        { params, headers }
      )

      const data = response.data || []

      // On essaie de toujours obtenir un tableau de films
      let newMovies
      if (Array.isArray(data)) {
        newMovies = data
      } else if (Array.isArray(data.results)) {
        newMovies = data.results
      } else if (Array.isArray(data.titles)) {
        newMovies = data.titles
      } else {
        newMovies = []
      }

      setMovies((prev) => (reset ? newMovies : [...prev, ...newMovies]))
    } catch (error) {
      console.error('Failed to load movies:', error)
    }
  }

  // Chargement initial + à chaque changement de filtre / tri / recherche
  useEffect(() => {
    setPage(1)
    loadMovies(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minYear, maxYear, genres, sort, title])

  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    loadMovies(next)
  }

  return (
    <div className="dashboard-page-content">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />

      <ul>
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id ?? movie.imdbId ?? movie.imdb_id}
              movie={movie}
            />
          ))}
      </ul>

      <Button
        label="Load More.."
        onClick={handleLoadMore}
      />
    </div>
  )
}

export default HomePage
