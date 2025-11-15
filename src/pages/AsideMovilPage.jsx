import { useForm } from 'react-hook-form'
import '../componentes/styles/HomePage/AsideMovil.css'
import { useEffect, useState } from 'react'
import getFilterItems from '../utils/useFilterItems'
import { setPricesG } from '../store/slices/productPrice'
import { useDispatch } from 'react-redux'

const AsideMovilPage = ({ visible, visibleA, setVisibleA, setFromTo }) => {


  const { handleAllCategories, filterByCategory } = getFilterItems()

  const [rotate, setRotate] = useState(false)
  const [rotate2, setRotate2] = useState(false)

  const { register, reset, handleSubmit } = useForm()

  useEffect(() => {

    if (visible) setVisibleA(!visible)
    
    if (!visibleA) {
      setRotate(false)
      setRotate2(false)
    }

  }, [visible, visibleA])



  let xStart = 0
  let drag = document.getElementById('AsideMovil')
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
   
    reset({
      from: '',
      to: ''
    })
  }

  //Close the modal with sweiper**********

  const start = e => {

    xStart = e.changedTouches[0].clientX

  }
  const inicio = e => {

    let touch = e.changedTouches[0]
    let xEnd = touch.clientX
    let move = xEnd - xStart

    if (move > 140) {

      setVisibleA(!visibleA)

    }
  }

  const filterCategory = e => {

    filterByCategory(e)

    setVisibleA(!visibleA)

    if (e == 5) handleAllCategories()

  }

  const handeClick = () =>{
    setVisibleA(!visibleA)
  }
  return (
    <div className={`aside__movil-main ${visibleA ? '' : 'hiden'} `} draggable='true' id='AsidelMovil' onTouchStart={start} onTouchEnd={inicio}>
      <div className={`container__aside`}>
        <div className='container__title__price'>
          <h4 className="title__header-aside">Price</h4>
          <h4 onClick={() => setRotate(!rotate)} className={`icono ${rotate ? 'rotate' : ''}`}><i class="bx bx-chevron-right bx-sm"></i></h4>
        </div>
        <hr />
        <form className={`container__form`} onSubmit={handleSubmit(submit)}>
          <div className='container__from'>

            <label htmlFor="from">From</label>
            <input className='input__price' {...register('from')} type="text" id="from" />

          </div>
          <div className='container__to'>

            <label htmlFor="to">To</label>
            <input className='input__price' {...register('to')} type="text" id="to" />

          </div>
          <div className='button__search__container'>
            <button onClick={handeClick} className='aside__search-btn'>Search</button>
          </div>
        </form>
        <div className={`body__aside ${rotate ? 'translate__price' : ''}`}>
          <div className='container__title__price'>
            <h4 className="title__header-aside-2">Category</h4>
            <h4 onClick={() => setRotate2(!rotate2)} className={`icono ${rotate2 ? 'rotate' : ''}`}><i class="bx bx-chevron-right bx-sm"></i></h4>
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

export default AsideMovilPage