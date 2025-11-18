import { useDispatch } from "react-redux"
import { addCartG, deleteCartG, getCartThunk } from "../store/slices/cart.slice"
import getConfigToken from "../utils/getConfigToken"
import axios from "axios"

const useCartApi = () => {

    const dispatch = useDispatch()
    
    // 🟢 BASE URL DE RENDER (Corregido)
    const RENDER_BASE_URL = 'https://mi-tienda-backend-ewfh.onrender.com';
    const baseUrl = `${RENDER_BASE_URL}/api/v1`; 

    //POST
    const addProductInCart = data =>{
        const url = `${baseUrl}/cart`
        axios.post(url, data, getConfigToken())
        .then(res => {
            console.log(res.data)
            // Esto ya estaba bien, asegura que el Header se actualice
            dispatch(getCartThunk()) 
        })
        .catch(err => console.log(err.response.data.error))
    }
    
    //DELETE
    const deleteProductToCart =( id) => {
        const url = `${baseUrl}/cart/${id}`
        axios.delete(url, getConfigToken())
        .then(res => {
            
            // Este método de doble dispatch es seguro, aunque la llamada al thunk es la que actualizará el estado con los datos del servidor.
            // dispatch(deleteCartG(id)) 
            dispatch(getCartThunk())
          
        })
        .catch(err => console.log(err))
    }

    //*****************UPDATE**************************
    const updateProductInCart = (data , id) =>{
        const url = `${baseUrl}/cart/${id}`
        axios.put(url, data, getConfigToken())
        .then(res => {
            console.log(res.data)
            dispatch(getCartThunk())

        })
        .catch(err => console.log(err))
    }


    return {addProductInCart, deleteProductToCart, updateProductInCart}
}

export default useCartApi