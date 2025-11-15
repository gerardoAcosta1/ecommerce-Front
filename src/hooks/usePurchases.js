import axios from "axios";
import getConfigToken from "../utils/getConfigToken";
import { useDispatch } from "react-redux";
import { getCartThunk } from "../store/slices/cart.slice";
import { useState } from "react";


const usePurchases = () => {
    const [purchases, setPurchases] = useState()

    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases'

    const dispatch = useDispatch()

    //POST
    const makePurchase = () => {
        axios.post(url,{},getConfigToken())
        .then(res => {
            console.log(res.data)
            dispatch(getCartThunk())
            
        })
        .catch(err => console.log(err))
    }
    //GET
    const getAllPurchases = () => {
        axios.get(url,getConfigToken())
        .then(res => setPurchases(res.data))
        .catch(err => console.log(err))
    }
    return {makePurchase, getAllPurchases, purchases}
}

export default usePurchases