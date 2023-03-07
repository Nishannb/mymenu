import React from 'react'
import star from '../../icons/rocket.png'
import { useNavigate } from 'react-router-dom'

function HomePageNavBar({solutions}) {

  let navigate = useNavigate()

  const scrollToContacts = (elementRef) =>{
    elementRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='HomePageNavBar'>
        <div className="homepageNavBar-logo-card">
            <img src={star} alt="logo" />
            <h3>myMenu</h3>
        </div>
        <div className="homepageNavBar-navitems-card">
            <ul>
                <li>About Us </li>
                <li onClick={()=> scrollToContacts(solutions)}>Solutions</li>
                <li onClick={()=> navigate('/admin/login')}>Login</li>
                <li className='start-trial' onClick={()=> navigate('/admin/register')}>Get 1 Month Free</li>
            </ul>
        </div>
    </div>
  )
}

export default HomePageNavBar