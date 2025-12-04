import { useDispatch, useSelector } from "react-redux"
import CardProduct from "../componentes/HomePage/CardProduct"
import '../componentes/styles/HomePage/HomePage.css'
import AsideMovilPage from '../pages/AsideMovilPage'
import Aside from "../componentes/HomePage/Aside"
import Search from '../componentes/HomePage/Search'
import { getCartThunk } from "../store/slices/cart.slice"
import useFilterItems from "../utils/useFilterItems"
import { useEffect, useState } from "react"
import { getAllProductsThunk } from "../store/slices/products.slice"
import useAuth from '../hooks/useAuth'


const HomaPage = ({ visibleA, setVisibleA, visible }) => {

    const dispatch = useDispatch()
    const { loginUser } = useAuth(); 

    const [entrando, setEntrando] =  useState(true)
    
    const products = useSelector(reducer => reducer.products) 
    
    // URL BASE DE BACKEND EN RENDER 
    const RENDER_BASE_URL = "https://mi-tienda-backend-ewfh.onrender.com"; 


    useEffect(()=>{
        
    
        const TEST_CREDENTIALS = {
            email: 'gerardo@gmail.com', 
            password: '123456' 
        };
        
        loginUser(TEST_CREDENTIALS);


        // Cargar datos iniciales
        dispatch(getCartThunk())
        dispatch(getAllProductsThunk())
        localStorage.setItem('home', 'pass')

        const miuser = localStorage.getItem('token')
        console.log('el user tiene el token', miuser)

        const wakeUpServer = async () => {
            try {
                // Petición para evitar que el servidor de Render se duerma (límite es 15 min).
                const response = await fetch(`${RENDER_BASE_URL}/api/v1/products`);
                if (response.ok) {
                    console.log(`[Keep-Alive]: Servidor activo. Última comprobación: ${new Date().toLocaleTimeString()}`);
                }
            } catch (error) {
                console.warn("[Keep-Alive]: Error al contactar al servidor.", error);
            }
        };

        // 840000 ms = 14 minutos.
        const intervalId = setInterval(wakeUpServer, 840000); 

        // Ejecutar inmediatamente al cargar
        wakeUpServer();

        // Limpieza: Detener el intervalo al desmontar
        return () => clearInterval(intervalId);
        
    }, [dispatch]) 

    console.log(products) 

    // FILTRADO SEARCH MAIN
    const {nameValue, inputName, handleFilterName, cbFilter, setFromTo} = useFilterItems()

    return (

        <div className="main__container">
                <div className="flotante__mensaje">
                        <h4 className="mensaje__flotante">Debido a que se utiliza un servidor gratuito, este suele apagar la base de datos para ahorrar consumo, si no logra observar 
                        los productos, por favor espere al menos unos 2 minutos para que el servidor se despierte, ya se envió la petición al server. Gracias por su comprensión.
                        </h4>
                </div>
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
                    // Usa 'products' para filtrar y mapear
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