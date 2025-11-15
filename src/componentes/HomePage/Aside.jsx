import { useForm } from 'react-hook-form'
import '../styles/HomePage/Aside.css'
import { useState } from 'react'
import getFilterItems from '../../utils/useFilterItems'
import { setPricesG } from '../../store/slices/productPrice'
import { useDispatch } from 'react-redux'
const Aside = ({setFromTo}) => {

  
  const [rotate, setRotate] = useState(false)
  const [rotate2, setRotate2] = useState(false)

  const { register, reset, handleSubmit } = useForm()
  const { handleAllCategories, filterByCategory} = getFilterItems()

const dispatch = useDispatch()
  const submit = data => {

    const from = +data.from
    const to = +data.to
    let obj= {
      from: from || 0,
      to: to || Infinity
    }
    console.log(obj)
    dispatch(setPricesG(obj))
    console.log()
   
    reset({
      from: '',
      to: ''
    })
  }
  const rotated = e => {
    if (e == 1) {
      setRotate(!rotate)
    } else {
      setRotate2(!rotate2)
    }
  }

  const filterCategory = e => {

    filterByCategory(e)
    console.log(e)
    if (e == 5) handleAllCategories()

  }
  return (
    <div className={`container__aside__main `} id='container__aside'>
      <div className={`container__aside`}>
        <div className='container__title__price'>
          <h4 className="title__header-aside">Price</h4>
          <h4 onClick={() => rotated(1)} className={`icono ${rotate ? 'rotate' : ''}`}><i class="bx bx-chevron-right bx-sm"></i></h4>
        </div>
        <hr />
        <form className={`container__form`} onSubmit={handleSubmit(submit)}>
          <div className='container__from'>

            <label htmlFor="from">From</label>
            <input className='input__price' {...register('from')} type="number" id="from" />

          </div>
          <div className='container__to'>

            <label htmlFor="to">To</label>
            <input className='input__price' {...register('to')} type="number" id="to" />

          </div>
          <div className='button__search__container'>
            <button className='aside__search-btn'>Search</button>
          </div>

        </form>
        <div className={`body__aside ${rotate ? 'translate__price' : ''}`}>
          <div className='container__title__price'>
            <h4 className="title__header-aside-2">Category</h4>
            <h4 onClick={() => rotated(2)} className={`icono ${rotate2 ? 'rotate' : ''}`}><i class="bx bx-chevron-right bx-sm"></i></h4>
          </div>
          <div className='container__buttons'>
            <div className={`container__category ${rotate2 ? 'translate__category' : ''}`}>
              <button className='button__category' onClick={() => filterCategory(1)}>Computers</button>
              <button className='button__category' onClick={() => filterCategory(2)}>Smartphones</button>
              <button className='button__category' onClick={() => filterCategory(3)}>Smart tv</button>
              <button className='button__category' onClick={() => filterCategory(4)}>Stoves</button>
              <button className='button__category' onClick={() => filterCategory(5)}>All Products</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Aside