import './movies.css'
import SearchBar from '../general/SearchBar'
import Input from '../general/Input'
import SelectInput from '../general/SelectInput'
import Tag from './Tag'

const ALL_GENRES = [
  'action',
  'drama',
  'comedy',
  'biography',
  'romance',
  'thriller',
  'war',
  'history',
  'sport',
  'sci-fi',
  'documentary',
  'crime',
  'fantasy',
]

const Filter = ({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) => {
  return (
    <div className="filter-container">
      {/* Recherche par titre */}
      <SearchBar title={title} setTitle={setTitle} />

      {/* Années + tri */}
      <div className="filter-row">
        <Input
          label="Min year"
          type="number"
          value={minYear}
          setValue={setMinYear}
          inputAttributes={{ min: 1900, max: new Date().getFullYear() }}
        />
        <Input
          label="Max year"
          type="number"
          value={maxYear}
          setValue={setMaxYear}
          inputAttributes={{ min: 1900, max: new Date().getFullYear() }}
        />

        <SelectInput
          label="Sort by"
          value={sort}
          setValue={setSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'highestrated', label: 'Highest rated' },
            { value: 'lowestrated', label: 'Lowest rated' },
          ]}
        />
      </div>

      {/* Genres */}
      <ul className="filter-tags">
        {ALL_GENRES.map((g) => (
          <Tag
            key={g}
            genre={g}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  )
}

export default Filter
