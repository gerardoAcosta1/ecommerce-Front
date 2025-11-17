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
import useAuth from '../hooks/useAuth' // 🟢 Importación necesaria para el login automático


const HomaPage = ({ visibleA, setVisibleA, visible }) => {

    const dispatch = useDispatch()
    const { loginUser } = useAuth(); // 🟢 Inicializa el hook para acceder a loginUser
    
    // 🟢 Obtiene el estado 'products' de Redux
    const products = useSelector(reducer => reducer.products) 
    
    // URL BASE DE TU BACKEND EN RENDER (Keep-Alive)
    const RENDER_BASE_URL = "https://mi-tienda-backend-ewfh.onrender.com"; 


    useEffect(()=>{
        
        // ===================================================
        // 🟢 LÓGICA DE LOGIN AUTOMÁTICO PARA PRUEBAS
        // ===================================================
        const TEST_CREDENTIALS = {
            email: 'gerardo@gmail.com', 
            password: '123456' 
        };
        
        //Ejecuta la función de login al cargar. Esto setea el token en localStorage.
        loginUser(TEST_CREDENTIALS);
        // ===================================================


        // Cargar datos iniciales
        dispatch(getCartThunk())
        dispatch(getAllProductsThunk())
        localStorage.setItem('home', 'pass')

        const miuser = localStorage.getItem('token')
        console.log('el user tiene el token', miuser)
        // 2. LÓGICA DE KEEP-ALIVE 
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