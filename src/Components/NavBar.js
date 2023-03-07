import React from 'react'
import logo from '../icons/logo.png'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function NavBar ({navBarItem, leftBarItem}) {

    let navigate = useNavigate('')
    const [ cookies, setCookie, removeCookie] = useCookies(['user'])

    const handleClick=(e)=>{
      e.preventDefault()
      const toDo = e.target.innerHTML
      if(toDo.includes("Orders")){
        navigate('/checkout')
      } else if (toDo.includes("Logout")){
        removeCookie('UserEmail')
        removeCookie('AuthToken')
        navigate('/admin/login')
      } else {
        const name = JSON.parse(localStorage.getItem('myMenuParams'))
        const id = JSON.parse(localStorage.getItem('myMenuTable'))
        navigate(`/${name}/${id}`)
      }
    }

  return (
    <div className='navBar-container'>
        {leftBarItem && <div className="order">
          <button onClick={handleClick}>{leftBarItem}</button>
        </div>}
        <div className="brand-name">
            <img src={logo} alt="logo" />
            <h2>Jet Menu</h2>
        </div>
        <div className="order">
          {navBarItem && <button onClick={handleClick}>{navBarItem}</button>}
        </div>
        
    </div>
  )
}

export default NavBar 