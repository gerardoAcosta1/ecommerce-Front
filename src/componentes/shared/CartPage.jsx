import { useDispatch, useSelector } from 'react-redux'
import '../styles/CartPage.css'
import { getCartThunk } from '../../store/slices/cart.slice'
import CartProduct from './CartProduct'
import usePurchases from '../../hooks/usePurchases'
import { useEffect } from 'react'

const CartPage = ({ visible, setVisible }) => {

  const { makePurchase, getAllPurchases, purchases } = usePurchases()

  const cart = useSelector(reducer => reducer.cart.cartItems)
  let total = 0
  let xStart = 0

  window.document.addEventListener('click', e => {

    if (visible) {
      setVisible(!visible)
    }
  })

  total = (Array.isArray(cart) ? cart : []).reduce((acc, cv) => { 
    
    // 1. Convertir los precios a números y redondear
    const price = parseFloat(cv.price) || 0;
    const quantity = cv.quantity || 0;

    // 2. Calcular el subTotal
        const subTotal = quantity * price;

    // 3. 🛑 CORRECCIÓN: Usar una función de precisión para sumar
    // Multiplicamos por 100 para trabajar con centavos (enteros) y luego dividimos por 100
    return (acc * 100 + subTotal * 100) / 100;
    
      }, 0);

  //Close the modal with sweiper**********

  const start = e => {
    xStart = e.changedTouches[0].clientX
  }
  const inicio = e => {

    let touch = e.changedTouches[0]
    let xEnd = touch.clientX
    let move = xEnd - xStart

    if (move > 100) {


      setVisible(false)

    }
  }

  //Buy Car ******************

  const buy = () => {

    makePurchase()
    getAllPurchases()

  }
useEffect(() => {
  
},[])

  return (
    <div
      id='cartPage' onTouchStart={e => start(e)} onTouchEnd={e => inicio(e)}
      onClick={e => e.stopPropagation()}
      className={`main__cart ${visible ? '' : 'hiden'}`} >

      <h3 className='main__cart__title' id='cartPage' > Buy Cart </h3>
      <div className="content__cart" >

        {

cart?.map(product => (
              <CartProduct
                draggable
                key={product.product_id}
                product={product}
              />
          ))
        }

      </div>

      <div className='container__button__buy'>

        <div className='price__buy'>
          <h4 className='total-title-buy'>total</h4>
          <h3 className='total-price'>${total.toFixed(2)}</h3>
        </div>

        <button
          onClick={buy}
          className='button__buy'>Buy
        </button>
      </div>
    </div>
  )
}

export default CartPage