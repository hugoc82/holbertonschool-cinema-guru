import './components.css'

const Activity = ({ activity }) => {
  // on essaie de formatter un peu proprement,
  // mais si on ne connaît pas la structure exacte,
  // on affiche au moins quelque chose.
  const description =
    activity?.description ||
    activity?.message ||
    activity?.text ||
    `${activity?.username || 'User'} did something`

  return (
    <li className="activity-item">
      <p>{description}</p>
    </li>
  )
}

export default Activity
