import { useEffect, useState } from 'react'
import '../styles/ProductPage/ProductImage.css'
const ProductImage = ({ product }) => {

  const [image, setImage] = useState(0)
  const [num, setNum] = useState(0)

 
useEffect(()=>{

 handleClick()
 console.log(product)
 
},[image])

const handleClick = e =>{

  if(image == 3 && e == 1){
    setImage(2)
  }

  if(image < 2 && e == 1)setImage(image + 1)
  if(image > 0 && e == 0) setImage(image - 1)
  
  if(image == 0) setNum(0) 
  if(image == 1) setNum(-100)
  if(image == 2)setNum(-200)
  
}
console.log(product)
  return (
    <div className="container__1">
      <div className='container__2'>
        <div className='container__left'>
          <div onClick={() => handleClick(0)} className='slider__left'><i class='bx bx-chevron-left'></i></div>
          
        </div>
        <div className='container__slider'>

          <div className='slider__image'>
            <img className={`image  `}style={{transform: image == 0  ?  `translate(${num}%)` : `translate(${num}%)`}} src={product?.images[0]} alt="" />
            <img className={`image `} style={{transform: image == 1   ? `translate(${num}%)` : `translate(${num}%)`}}src={product?.images[1]} alt="" />
            <img className={`image `}style={{transform: image == 2  ? `translateX(${num}%)` : `translate(${num}%)`}} src={product?.images[2]} alt="" />
          </div>

          
        </div>
        <div className='container__right'>

        <div onClick={() => handleClick(1)} className='slider__right'><i class="bx bx-chevron-right"></i></div>
        
        </div>
      </div>

    </div>

  )
}

export default ProductImage