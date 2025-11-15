import { createSlice } from "@reduxjs/toolkit";

const productPrice= createSlice({
    name: 'price',
    initialState: {
        from: 0,
        to: Infinity
    },
    reducers:{
        setPricesG: (state, action) => state = action.payload,
        
        
    }
})

export const {setPricesG} = productPrice.actions
export default productPrice.reducer