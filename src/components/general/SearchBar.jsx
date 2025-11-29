import './general.css';

const SearchBar = ({ title, setTitle }) => {
	const handleInput = (event) => {
		setTitle(event.target.value);
	}
	return (
		<input
			type='text'
			value={title}
			onChange={handleInput}
			className="search-bar"
		/>
	);
};

export default SearchBar;