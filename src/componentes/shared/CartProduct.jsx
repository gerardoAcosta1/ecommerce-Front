import React, { useState } from 'react'
import {  getCartThunk } from '../../store/slices/cart.slice'
import '../styles/CartProduct.css'
import useCartApi from '../../hooks/useCartApi'
const CartProduct = ({ product }) => {
    
    const [count, setcount] = useState(1)
    const { deleteProductToCart, updateProductInCart } = useCartApi()

        console.log('product en cartproduct', product)
    const handleCounter = e => {
        if (e === 1) {

            setcount(count + 1)
            let data = { quantity: product?.quantity + 1 }
            updateProductInCart(data, product?.product_id)
            console.log('la data contiene', data, 'y product contiene',product)
            getCartThunk()

        }
        if ( e == 0 && product?.quantity > 1) {

            setcount(count - 1)
            let data = { quantity: product?.quantity - 1 }
            updateProductInCart(data, product?.product_id)
            getCartThunk()

        }


    }
    const deleteProduct = () => {

            deleteProductToCart(product?.product_id)
    }




    return (
        <div className='CartProduct' >
            
            <div className='sections'>
                <section className='section__1__cart'>
                    <img  className='image__cart' src={product.image_url} alt="" />
                </section>
                
                <section className="section__2__cart">
                    <h3 className="title__cart">{product?.title}</h3>

                    <div className="buttons__main__cart">
                        <button className="button__cart" onClick={() => handleCounter(0)}>-</button>
                        <span className="counter__cart">{product?.quantity}</span>
                        <button className="button__cart" onClick={() => handleCounter(1)}>+</button>
                    </div>

                </section>

                <section className="section__3__cart">

                    <span className="icon__cart"><i onClick={deleteProduct} class='bx bx-trash bx-sm'></i></span>
                </section>

            </div>
            <div className='section__4__cart'>
                <h5>X{product.quantity}</h5>
                <h5 className='total__cart'>Total</h5>
                <h4 className='price__cart'> ${product?.product?.price}</h4>
            </div>
         


        </div>
    )
}

export default CartProduct