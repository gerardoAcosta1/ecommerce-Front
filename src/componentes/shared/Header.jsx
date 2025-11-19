import { Link, Navigate, useNavigate } from "react-router-dom"
import '../styles/Header.css'
import { useState } from "react"
import { getCartThunk } from "../../store/slices/cart.slice"
import { useDispatch, useSelector } from "react-redux" 
import { getAllProductsThunk } from "../../store/slices/products.slice"

const Header = ({setVisible, visible, setCount, count, visibleA}) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const cartProducts = useSelector(state => state.cart.cartItems || []);
    
    // Calcular la cantidad total de artículos
    console.log('en header,m viendo el valor de cartproduct: ', cartProducts)
    const totalItems = cartProducts.reduce((acc, product) => acc + product.quantity, 0); 

    const clickFuera = () => {
    }

    const isVisible = ()=>{
        if(localStorage.getItem('token')){
            setVisible(!visible)
            setCount(count + 1)
        }else{
            navigate('/login')
        }
    }
    
    const handleHome = () => {
        dispatch(getAllProductsThunk())
    }
    
    // Nota: Se eliminó el document.addEventListener

    return (

        <div className='fixed'>
            <nav className='container__header'>

                <div className='logo__header'>
                    <Link to='/'>
                        <strong onClick={handleHome}>e-commerce</strong>
                    </Link>
                </div>

                <button className='item__header'>
                    <Link to='/login'>
                        <i className='bx bx-user bx-bg'></i>
                    </Link>
                </button>

                <button className='item__header'>
                    <Link to='/purchases'>
                        <i className='bx bx-window-open bx-bg'></i>
                    </Link>
                </button>

                <button onClick={e => e.stopPropagation()} className='item__header'>
                
                    <i onClick={isVisible} className='bx bx-cart bx-bg'>
                        <h3 className="cantidad">{totalItems}</h3>
                    </i>
                
                </button>
            </nav>
        
        </div>
    )
}

export default Header