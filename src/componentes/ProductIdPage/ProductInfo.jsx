import useCartApi from '../../hooks/useCartApi'
import '../styles/ProductPage/ProductInfo.css'

import { useState } from "react"
const ProductInfo = ({ product }) => {

    const [count, setcount] = useState(1)
    const {addProductInCart} = useCartApi()

    const handleCounter = e => {
        if (e === 1) {
            setcount(count + 1)
        } else {
            if (count > 1) setcount(count - 1)

        }
    }

    const handleClick = e => {

        e.stopPropagation()

        const data = {
            quantity: count,
            productId: product.id
        }
        
        addProductInCart(data)
    }
    return (
        <div className="main__info">
           
                <article className="article__info">
                    <h4 className="marca__info">{product?.brand}</h4>
                    <h3 className="title__info">{product?.title}</h3>
                    <div className='container__3-elements'>
                    <div className='container__2-elements'>
                        <div className='container__price-quantity'>
                            <section className="price__product">
                                <h4 className="title-price__product">Price</h4>
                                <span className="price">${product?.price}</span>
                            </section>
                            <section className="quantity">
                                <h4 className="quantity__title">Quantity</h4>
                                <div className="buttons__main">
                                    <button className="button1__main" onClick={() => handleCounter(0)}>-</button>
                                    <span className="counter__main">{count}</span>
                                    <button className="button2__main" onClick={() => handleCounter(1)}>+</button>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <button onClick={handleClick} className="button-cart" >Add to Cart</button>
                        </footer>
                    </div>

                    <p className="description__info">{product?.description}</p>
                </div>
                </article>
                
                {/*
            <article className="article__info">
                <h4 className="marca__info">Samsung</h4>
                <h3 className="title__info">Samsung Galaxy S22</h3>
                <div className='container__3-elements'>
                    <div className='container__2-elements'>
                        <div className='container__price-quantity'>
                            <section className="price__product">
                                <h4 className="title-price__product">Price</h4>
                                <span className="price">$850.000</span>
                            </section>
                            <section className="quantity">
                                <h4 className="quantity__title">Quantity</h4>
                                <div className="buttons__main">
                                    <button className="button1__main" onClick={() => handleCounter(0)}>-</button>
                                    <span className="counter__main">{count}</span>
                                    <button className="button2__main" onClick={() => handleCounter(1)}>+</button>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <button className="button-cart">Add to Cart</button>
                        </footer>
                    </div>

                    <p className="description__info">Smartphone, Factory Unlocked Android Cell Phone, 256GB, 8K Camera & Video, Brightest Display, Long Battery Life, Fast 4nm Processor, US Version. 8K SUPER STEADY VIDEO: Shoot videos that rival how epic your life is with stunning 8K recording, the highest recording resolution available on a smartphone; Video captured is effortlessly smooth, thanks to Auto Focus Video Stabilization on Galaxy S22*</p>
                </div>

            </article>
    */}

        </div>
    )
}

export default ProductInfo