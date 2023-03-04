import React from 'react'
import star from '../../icons/rocket.png'

function HomePageNavBar() {
  return (
    <div className='HomePageNavBar'>
        <div className="homepageNavBar-logo-card">
            <img src={star} alt="logo" />
            <h3>myMenu</h3>
        </div>
        <div className="homepageNavBar-navitems-card">
            <ul>
                <li>About Us </li>
                <li>Solutions</li>
                <li>Login</li>
                <li className='start-trial'>Get 1 Month Free</li>
            </ul>
        </div>
    </div>
  )
}

export default HomePageNavBar