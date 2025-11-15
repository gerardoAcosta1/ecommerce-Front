import { useEffect } from 'react'
import '../styles/HomePage/Search.css'

const Search = ({ visibleA, setVisibleA, visible, nameValue,handleFilterName, inputName}) => {
useEffect(()=>{
  if(visible){
    setVisibleA(!visible)
  }
},[visible])
  
  return (
    <div className="container__input">
      <div>
        
      </div>
      <form className="form__input">
        <input value={nameValue} ref={inputName} onChange={handleFilterName} className="input" type="text" placeholder=' What are you looking for?' />
        <button className='button__input'><box-icon color='white' name='search'></box-icon></button>
      </form>
      <div className="Filter">
        <h4 onClick={() => setVisibleA(!visibleA)} className="Filter__name" > <i class='bx bx-filter-alt bx-sm'></i>Filters</h4>
        
      </div>
     
    </div>
  )
}

export default Search