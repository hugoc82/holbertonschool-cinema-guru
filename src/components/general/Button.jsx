import './general.css'

function Button({ label, className = '', onClick, icon, type = 'button' }) {
  return (
    <button
      type={type}
      className={`general-button ${className}`}
      onClick={onClick}
    >
      {icon && <span className="general-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  )
}

export default Button
