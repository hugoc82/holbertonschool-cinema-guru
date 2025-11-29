import { useState } from 'react'
import './movies.css'

const Tag = ({ genre, filter, genres, setGenres }) => {
  const [selected, setSelected] = useState(
    Array.isArray(genres) ? genres.includes(genre) : false
  )

  const handleTag = () => {
    if (!Array.isArray(genres) || !setGenres) return

    if (selected) {
      // retirer le genre
      setGenres(genres.filter((g) => g !== genre))
      setSelected(false)
    } else {
      // ajouter le genre
      setGenres([...genres, genre])
      setSelected(true)
    }
  }

  return (
    <li
      className={`tag ${filter ? 'tag-filter' : ''} ${
        selected ? 'tag-selected' : ''
      }`}
      onClick={handleTag}
    >
      {genre}
    </li>
  )
}

export default Tag
