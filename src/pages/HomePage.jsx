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
import useAuth from '../hooks/useAuth'


const HomaPage = ({ visibleA, setVisibleA, visible }) => {

    const dispatch = useDispatch()
    const { loginUser } = useAuth(); 
    
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

            <div className={`mensaje__inicial2 ${entrando ? '' : 'ocultarInicial'} ` }>
                <h3 className="mensaje_inicial_titulo">Se actualizaron los servidores tanto del backend como la base de datos. Al tratarse de servidores gratuitos, 
                    entran en modo sleep(dormido) para evitar consumo en los servidores. Se agregó un timer con interval para que envíe una petición cada 14 minutos al
                    server y así evitar que entre en ese modo. También,  se puso en automático para que se loguera el usuario registrado 
                    gerardo@gmail.com password 123456  </h3>

                    <button onClick={() => setEntrando(false)} className="button__inicial2">de acuerdo</button>
            </div>
        </div>
    )
}

export default HomaPage