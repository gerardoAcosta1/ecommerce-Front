import { Link, Navigate, useNavigate } from "react-router-dom"
import '../styles/Header.css'
import { useState } from "react"
import { getCartThunk } from "../../store/slices/cart.slice"
import { useDispatch } from "react-redux"
import { getAllProductsThunk } from "../../store/slices/products.slice"

const Header = ({setVisible, visible, setCount, count,visibleA}) => {
const clickFuera = () => {
 
}
const dispatch = useDispatch()
const navigate = useNavigate()
 const isVisible = ()=>{

  if(localStorage.getItem('token')){
    setVisible(!visible)
    setCount(count + 1)
  }else{
    navigate('/login')
  }

 }
 const handleHome =  ()=> {
 
  dispatch(getAllProductsThunk())
 }
const a = document.addEventListener('click', clickFuera)
  return (

    <div  className='fixed'>
      <nav  className='container__header'>

        <div className='logo__header'>
          <Link to='/'>
            <strong onClick={handleHome}>e-commerce</strong>
          </Link>
        </div>

        <button className='item__header'>
          <Link to='/login'>
            <i class='bx bx-user bx-bg'></i>
          </Link>
        </button>

        <button className='item__header'>
          <Link to='/purchases'>
            <i class='bx bx-window-open bx-bg'></i>
          </Link>
        </button>

        <button onClick={e => e.stopPropagation()} className='item__header'>
       
            <i onClick={isVisible} class='bx bx-cart bx-bg'></i>
         
          
        
        </button>
      </nav>
   
    </div>
  )
}

export default Header