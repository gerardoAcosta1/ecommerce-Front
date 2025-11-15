import { useParams } from 'react-router-dom'
import '../componentes/styles/ProductPage/ProductIdPage.css'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import ProductInfo from '../componentes/ProductIdPage/ProductInfo'
import SimilarProducts from '../componentes/ProductIdPage/SimilarProducts'
import ProductImage from '../componentes/ProductIdPage/ProductImage'
const ProductIdPage = () => {

    const {id} = useParams()
    const [product, getSingleProduct] = useFetch()

    useEffect(()=>{
        getSingleProduct(`/products/${id}`)
    },[id])
    if (!product) { // 🛑 Verificación si el producto aún no ha cargado
      return <div>Cargando producto...</div>
  }
   
  return (
    <div className='main__product' >

      <div className='container__section1'>
        <ProductImage
        product={product}
        />
        <ProductInfo
        product={product}
        />

      </div>
      <div >
      <SimilarProducts
        product={product}
        />
      </div>
        
    </div>
  )
}

export default ProductIdPage