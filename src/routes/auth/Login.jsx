import './auth.css'
import Input from '../../components/general/Input'
import Button from '../../components/general/Button'

const Login = ({ username, password, setUsername, setPassword }) => {
  return (
    <>
      <Input
        label="Username"
        value={username}
        setValue={setUsername}
        type="text"
      />

      <Input
        label="Password"
        value={password}
        setValue={setPassword}
        type="password"
      />

      <Button
        className="auth-submit"
        label="Sign In"
        type="submit"
      />
    </>
  )
}

export default Login
