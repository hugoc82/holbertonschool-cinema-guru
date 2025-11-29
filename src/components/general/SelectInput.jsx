import './general.css';

const SelectInput = ({ label, options, className, value, setValue }) => {
	const handleSelect = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className="selectInput">
			<label htmlFor="selectInput">{label}</label>
			<select
				className={className}
				value={value}
				onChange={handleSelect}
			>
			{options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
		<div className="red-line"></div>
		</div >
	  );
};

export default SelectInput;