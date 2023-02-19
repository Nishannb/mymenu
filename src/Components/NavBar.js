import React from 'react'
import logo from '../icons/logo.png'
import { useNavigate } from 'react-router-dom'

function NavBar ({navBarItem}) {

    let navigate = useNavigate('')

    const handleClick=(e)=>{
      e.preventDefault()
      const toDo = e.target.innerHTML
      if(toDo.includes("Orders")){
        navigate('/checkout')
      } else if (toDo.includes("Back")){
        navigate('/admin/dashboard')
      } else if (toDo.includes("Receipt")){
        navigate('/admin/receipt')
      } else {
        const name = JSON.parse(localStorage.getItem('myMenuParams'))
        const id = JSON.parse(localStorage.getItem('myMenuTable'))
        navigate(`/${name}/${id}`)
      }
    }

  return (
    <div className='navBar-container'>
        <div className="brand-name">
            <img src={logo} alt="logo" />
            <h2>myMenu</h2>
        </div>
        <div className="order">
          {navBarItem && <button onClick={handleClick}>{navBarItem}</button>}
        </div>
        
    </div>
  )
}

export default NavBar 