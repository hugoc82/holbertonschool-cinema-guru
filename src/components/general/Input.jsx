import './general.css';

const Input = ({ label, type, className, value, setValue, icon, inputAttributes }) => {
	const handleInput = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className="input">
		<div className="input-and-label">
		{icon && <img src={icon} alt="" className="icon" />}
		<label htmlFor="input">{label}</label>
		</div>
		<input
		type={type}
		className={className}
		value={value}
		onChange={handleInput}
		{...inputAttributes}
		/>
		</div>
	  );
};

export default Input;