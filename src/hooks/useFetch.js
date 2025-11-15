import axios from "axios"
import { useState } from "react"
const useFetch = () => {

    const baseUrl = '/api/v1'    
    const [infoApi, setInfoApi] = useState()






    const getApi = (path = '') => {
        const url = `${baseUrl}${path}`
        axios.get(url)
        .then(res => {
            setInfoApi(res.data)
           
        
        })
        .catch(err => console.log(err))
    }

    return [infoApi, getApi]
}
export default useFetch