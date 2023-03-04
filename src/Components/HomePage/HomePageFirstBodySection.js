import React from 'react'
import ConfettiFunc from '../Confetti'

function HomePageFirstBodySection() {
  return (
    <div className='HomePageFirstBodySection'>
        <div className="intro-section">
            <div className="intro-card">
                <h1>Menu that elevates your customer experience ...</h1>
                <h3>myMenu bring fun to your table.</h3>
                <p>myMenu gamified solutions provide restaurants to establish a tech-enabled ordering solutions which streamlines the ordering process for restaurants and most importantly elevate your customers experience with delightful and fun gamified solutions.</p>
                <button className='start'>Get Free 30 Days</button>
                <label htmlFor="email">Want to stay ahead of the Curve ?</label>
                <button className='startwithfuture'>Start Free & get access to future gamified solutions before release</button>
            </div>
        </div>
        <div className="GIFdemo-section">
            <div className="GIFdemo-card">
            {/* <ConfettiFunc /> */}
                <img src="https://media.giphy.com/media/haknjJ4tvXMpW/giphy.gif" alt='Demo product' />
            </div>
        </div>
    </div>
  )
}

export default HomePageFirstBodySection