import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import cart from './slices/cart.slice'
import price from "./slices/productPrice";
const store =  configureStore({
    reducer: {
        products,
        cart,
        price
        
    }
})
export default store