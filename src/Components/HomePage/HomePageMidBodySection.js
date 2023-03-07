import React from 'react'

function HomePageMidBodySection({solutions}) {
  return (
    <div ref={solutions} className='HomePageMidBodySection'>
        <h2>How restaurants are leveraging our product...</h2>
        <div className="services-section">
            <div className="services-card">
              <h3>Ordering & Managing Menu</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore corrupti in libero accusantium suscipit illo blanditiis, sequi autem voluptatum voluptates.</p>
              <button className='start'>Starter Feature</button>
            </div>
            <div className="services-card">
              <h3>Discount Distribution</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore corrupti in libero accusantium suscipit illo blanditiis, sequi autem voluptatum voluptates.</p>
              <button className='start'>Starter Feature</button>
            </div>
            <div className="services-card">
              <h3>Personalized Happy Hour</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore corrupti in libero accusantium suscipit illo blanditiis, sequi autem voluptatum voluptates.</p>
              <button className='start'>Starter Feature</button>
            </div>
            <div className="services-card">
              <h3>Gamified Loyalty program</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore corrupti in libero accusantium suscipit illo blanditiis, sequi autem voluptatum voluptates.</p>
              <button className='start'>Premium feature</button>
            </div>
        </div>
    </div>
  )
}

export default HomePageMidBodySection