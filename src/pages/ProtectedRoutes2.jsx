import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes2 = () => {
    if(localStorage.getItem('token')){
        return <Outlet/>
      }else{
        return <Navigate to='/login'/>
      }
}

export default ProtectedRoutes2