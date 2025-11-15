import { useNavigate } from 'react-router-dom'
import '../styles/HomePage/CardProduct.css'
import useCartApi from '../../hooks/useCartApi'
import { getCartThunk } from '../../store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'
import imageSrc from '../HomePage/public/image2.png'
import { useEffect } from 'react'
const CardProduct = ({ product }) => {


    //<!--<img className='image__card' src={product?.images[0].url} alt="" /> <img src={product.images} alt="" />


    const imageUrl = 
        // 1. Asegura que 'images' exista Y que tenga al menos un elemento
        product.images && product.images.length > 0 
        ? 
        // 2. Si es seguro, accede a la URL del primer elemento
        product.images[0].image_url 
        : 
        // 3. Si no hay imágenes, usa la URL de la imagen por defecto
        '/images/default.png';
    


    const { addProductInCart, updateProductInCart } = useCartApi()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(reducer => reducer.cart)
    const safeCart = Array.isArray(cart) ? cart : [];

    useEffect(()=>{
    },[])
    const handleNavigate = () => {

        navigate(`/product/${product.id}/`)
    }

    const handleAddCart = e => {

        e.stopPropagation()

        if (localStorage.getItem('token')) {

            dispatch(getCartThunk())
            
            let prod = safeCart?.filter(prod => prod?.product.id == product.id)

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
        <div className='container__product '>


            <article onClick={handleNavigate} className='product__card ' >
                <div className='modal__container'>
                    <h5 className='modal'></h5>
                </div>
                <div className='content__header'>
                    <header className='header__card'>

                        <img className='image__card' src={imageUrl} alt="" />


                    </header>
                </div>
                <section className='information__card'>
                    <h4 className='brand__card'>{product.marca}</h4>
                    <h3 className='title__card'>{product.title}</h3>
                    <article className='about__card'>
                        <h3 className='price__card-title'>Price</h3>
                        <span className='price__card'>${product.price}</span>
                        <span className='price__card'>{product.category}</span>

                    </article>
                    <button onClick={handleAddCart} className='button__card'><i class='bx bx-cart-alt bx-md'></i></button>
                    <box-icon type="solid" color='white' name="cart-alt"></box-icon>
                </section>
            </article>
        </div>

    )
}

export default CardProduct