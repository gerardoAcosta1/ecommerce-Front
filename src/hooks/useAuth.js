import axios from "axios"
import { useNavigate } from "react-router-dom"


const useAuth = () => {
    
    // Reemplaza esto si tu URL de Render cambia
    const RENDER_BASE_URL = 'https://mi-tienda-backend-ewfh.onrender.com'; 

    const navigate = useNavigate()
    
    const createUser = (data, navigate) => {

        const url = `${RENDER_BASE_URL}/api/v1/users` 
        
        axios.post(url, data)
        .then(res => {
            console.log(res.data)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    const loginUser = data => {
        
        const url = `${RENDER_BASE_URL}/api/v1/users/login`
        
        axios.post(url, data)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            console.log(localStorage.getItem('token'))
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            localStorage.removeItem('token')
        })
    }
    return { createUser, loginUser }
}
 

export default useAuth