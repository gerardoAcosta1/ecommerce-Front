// CartPage.jsx

import { useDispatch, useSelector } from 'react-redux'
import '../componentes/styles/CartPage.css'
import { useEffect } from 'react'
import { getCartThunk } from '../store/slices/cart.slice'
import CartProduct from '../componentes/shared/CartProduct'
import usePurchases from '../hooks/usePurchases'

const CartPage = ({ visible }) => {

    //Obtener datos del carrito desde el store
    const cart = useSelector(reducer => reducer.cart)

    const { makePurchase, getAllPurchases, purchases } = usePurchases()
    const dispatch = useDispatch()

    // Se quita 'cart' de las dependencias para evitar el bucle infinito.
    useEffect(() => {
        // Usamos dispatch en useEffect para satisfacer las reglas de reacthooks.
        dispatch(getCartThunk())
    }, [visible, dispatch]) // 'visible' activa la recarga al abrir/cerrar.

    //cálculo del total se protege con un array vacío [] si 'cart' es null/undefined.
    const total = (Array.isArray(cart) ? cart : []).reduce((acc, cv) => {
        // Aseguramos que cv.product existe antes de acceder a price
        const subTotal = cv.quantity * (cv.product?.price || 0)
        return acc + subTotal
    }, 0)


    const buy = () => {
        // Lógica para ejecutar la compra (POST /purchases)
        makePurchase()
        console.log(purchases)
        // Se recomienda recargar el carrito y luego las compras, o viceversa.
        getAllPurchases() 
        dispatch(getCartThunk()) // Recargar el carrito para mostrarlo vacío
    }
    
    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`main__cart ${visible ? '' : 'hiden'}`}
            draggable='true'
            id='cartPage'
        >
            <h3 className='main__cart__title'> Buy Cars </h3>
            
            <div className="content__cart" >
                {
                    // 4. Iteración correcta: Itera sobre los ítems del carrito.
                    (Array.isArray(cart) ? cart : []).map((product, index) => (
                        <CartProduct
                            draggable
                            key={index
                            }
                            product={product} // 'product' es un ítem del carrito, NO un array de imágenes
                        />
                    ))
                }
            </div>
            <div className='container__button__buy'>
                <div className='price__buy'>
                    <h3>${total}</h3>
                </div>
                <button
                    onClick={buy}
                    className='button__buy'>Buy</button>
            </div>
        </div>
    )
}

export default CartPage