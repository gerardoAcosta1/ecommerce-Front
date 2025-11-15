import { useDispatch, useSelector } from "react-redux"
import CardProduct from "../componentes/HomePage/CardProduct"
import '../componentes/styles/HomePage/HomePage.css'
import AsideMovilPage from '../pages/AsideMovilPage'
import Aside from "../componentes/HomePage/Aside"
import Search from '../componentes/HomePage/Search'
import { getCartThunk } from "../store/slices/cart.slice"
import useFilterItems from "../utils/useFilterItems"
import { useEffect } from "react"
import { getAllProductsThunk } from "../store/slices/products.slice"


const HomaPage = ({ visibleA, setVisibleA, visible }) => {

    const dispatch = useDispatch()

useEffect(()=>{

    dispatch(getCartThunk())
    dispatch(getAllProductsThunk())

    localStorage.setItem('home', 'pass')

}, [])

    const products = useSelector(reducer => reducer.products)

    console.log(products)

    //FILTRADO SEARCH MAIN
    
    const {nameValue, inputName, handleFilterName, cbFilter, setFromTo} = useFilterItems()

    return (

        <div className="main__container">

            <Aside
               setFromTo={setFromTo}

            />
          
            <div className="products__container">

                <Search
                    visibleA={visibleA}
                    setVisibleA={setVisibleA}
                    visible={visible}
                    nameValue={nameValue}
                    handleFilterName={handleFilterName}
                    inputName={inputName}
                    
                />
              
                {

                    products?.filter(cbFilter).map(product => (

                        <CardProduct
                            key={product.id}
                            product={product}


                        />
                    ))
                }
            </div>
        </div>
    )
}

export default HomaPage