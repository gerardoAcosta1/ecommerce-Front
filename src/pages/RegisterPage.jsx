import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import '../componentes/styles/RegisterPage/RegisterPage.css'

const RegisterPage = () => {

  const { register, reset, handleSubmit } = useForm()

  const { createUser } = useAuth()
  const navigate = useNavigate()
  const submit = data => {
    createUser(data, navigate)
    reset({
      firrstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: ''
    })
  }
  return (

    <div className="container__main">

      <div className="container__register1">
        <form onSubmit={handleSubmit(submit)}>
          <div className="container__title__register">
            <h3 className="singUp">Sing Up</h3>
          </div>

          <div className="container__register">

            <div>

              <label className="title__register" htmlFor="firstname">First Name</label>

              <input className="input__register"{...register('firstName')} type="text" id="firstname" />

            </div>

            <div>

              <label className="title__register" htmlFor="lastname">Last Name</label>

              <input className="input__register"{...register('lastName')} type="text" id="lastname" />

            </div>

            <div>

              <label className="title__register" htmlFor="email">Email</label>

              <input className="input__register"{...register('email')} type="email" id="email" />

            </div>

            <div>

              <label className="title__register" htmlFor="password">Password</label>

              <input className="input__register"{...register('password')} type="password" id="password" />

            </div>

            <div>

              <label className="title__register" htmlFor="phone">Phone</label>

              <input className="input__register"{...register('phone')} type="text" id="phone" />

            </div>

            <button className="button__register">Create User</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage