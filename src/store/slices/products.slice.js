import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
    name: 'products',
    initialState: null,
    reducers:{
        setProductsG: (state, action) => action.payload,
        
        
    }
})

export const {setProductsG} = productsSlice.actions
export default productsSlice.reducer

export const getAllProductsThunk = () => dispatch =>{
    const url = 'https://mi-tienda-backend-ewfh.onrender.com/api/v1/products'

    axios.get(url)
    .then(res => dispatch(setProductsG(res.data)))
    .catch(err => console.log(err))
    

}

export const getFilteredProductsThunk = id => dispatch =>{
    const url = `https://mi-tienda-backend-ewfh.onrender.com/api/v1/categoryId?id=${id}`
    axios.get(url)
    .then(res => dispatch(setProductsG(res.data)))
    .catch(err => console.log(err))

}