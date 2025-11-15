import { useNavigate } from 'react-router-dom';
import useCartApi from '../../hooks/useCartApi';
import '../styles/ProductPage/CardProductSimilar.css'
import { useDispatch, useSelector } from 'react-redux';


const CardProduct = ({ product }) => {

   
    const { addProductInCart, updateProductInCart } = useCartApi()

    const navigate = useNavigate()
 
    console.log(product)
    const cart = useSelector(reducer => reducer.cart)

    const handleNavigate = e => {
        e.stopPropagation()
        navigate(`/product/${product.id}/`)
        window.scrollTo(1, 0);
    }

    const handleAddCart = e => {

        e.stopPropagation()

        if (localStorage.getItem('token')) {

        

            let prod = cart?.filter(prod => prod?.product.id == product.id)

            if (prod[0]?.quantity) {

                const data = {

                    quantity: prod[0]?.quantity + 1,
                }

                updateProductInCart(data, prod[0]?.id)

            } else {

                const data = {

                    quantity: 1,
                    productId: product.id
                }

                addProductInCart(data)
            }

        } else {

            navigate(`/login`)
        }
    }

    return (
        <div className='container__product' >
            <article className='card__product ' onClick={handleNavigate}  >
                <div className='container__header__image'>
                    <header className='card__header'>
                        <img className='card__image' src={product?.images[0].image_url} alt="" />
                    </header>
                </div>
                <section className='card__information'>
                    <h4 className='card__brand'>{product.marca}</h4>
                    <h3 className='card__title'>{product.title}</h3>
                    <article className='card__about'>
                        <h3 className='title-card__price'>Price</h3>
                        <span className='card__price'>${product.price}</span>
                    </article>
                    <button onClick={handleAddCart} className='card__button'><i class='bx bx-cart-alt bx-md'></i></button>
                    <box-icon type="solid" color='white' name="cart-alt"></box-icon>
                </section>
            </article>
        </div>



    )
}

export default CardProduct