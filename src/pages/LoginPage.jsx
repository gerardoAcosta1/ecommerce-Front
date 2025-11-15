import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import '../componentes/styles/LoginPage/LoginPage.css'
import { useNavigate, useSearchParams } from "react-router-dom"
import RegisterPage from "./RegisterPage"
import { useState } from "react"
import { Link } from "react-router-dom"
const LoginPage = () => {

  const { register, reset, handleSubmit } = useForm()
  const [registerPage, setRegisterPage] = useState(false)

  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const submit = data => {
    loginUser(data, navigate)
    reset({
      email: '',
      password: ''
    })
  }

  const handleRegister = () => {
    setRegisterPage(true)
    navigate('/register')
  }
  return (
   
    <div className="container__main">
       
      
   
      <div className="container__login">
        <div>
        <div className="container__welcome">
          <h2 className="welcome">Welcome! Enter your email and password to continue</h2>
        </div>
          <div className="container__test-area">
            <h4 className="test">Test data</h4>
            <ul className="container__dates">
              <li className="email__test">jhon@gmail.com</li>
              <li className="password__test">123</li>
            </ul>
          </div>
          < form onSubmit={(handleSubmit(submit))}>

            <div className="container__form__1">
              <div className="login__section1__">

                <label className="login__title__email" htmlFor="email">Email</label>

                <input className="input__email" {...register('email')} type="email" id="email" />

              </div>
              <div className="login__section2">

                <label className="login__title__password" htmlFor="password">Password</label>

                <input className="input__password" {...register('password')} type="password" id="password" />

              </div>
              <button className="button__login">Login</button>
            </div>
          </form>
          
          <p className="pie__login">Don't have an account?<Link to={'/register'}>Sign up </Link></p>
         
          
      

        </div>
       
        
      </div>

    </div>
  

  )
}

export default LoginPage