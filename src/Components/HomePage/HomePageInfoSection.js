import React from 'react'
import together from '../../icons/together.jpeg'
import frontpageMenuEng from '../../icons/MenuEngineering_front.png'
import gamification_front from '../../icons/gamification_front.png'
import gamificationPDF from '../../assests/JetMenugamification.pdf'
import menuEngineeringPDF from '../../assests/JetMenu_MenuEngineering.pdf'


function HomePageInfoSection() {
  return (
    <>
        <div className='HomePageInfoSection'>
        <div className="heading">
            <h4>Why myMenu</h4>
            <h2>Your guests expect unique and delightful experience from your brand. <br /> Use our technology to delight your customers</h2>
        </div>
        <div className="info-body">
             {/* Use your app image */}
            <img src={together} alt="" />
            <ul>
                <div className="info-body-card">
                    <li><span>&#x2713;</span> Make gamified Menu as your USP</li>
                    <li><span>&#x2713;</span> Provide delightful customer experience</li>
                </div>
                <div className="info-body-card">
                    <li><span>&#x2713;</span> Stand out from Crowd: Give customers reasons to remember you outside restaurant</li>
                    <li><span>&#x2713;</span> Easily change or manage Menu</li>
                </div>
                <div className="info-body-card">
                <li><span>&#x2713;</span> Interactive interface for creation & distribution of future coupons</li>
                <li><span>&#x2713;</span> Upsell with gamification: Incentives customers for more purchases</li>
                </div>
                <li><span>&#x2713;</span> Integrate loyalty program with myMenu cheque</li>
            </ul>
        </div>
        <button className='start'>Try 30 days for Free</button>
    </div>
    <div className="more-info">
        <h3>Striving for More tips? We've got you covered. </h3>
        <div className="information-card-section">
            <div className="information-card">
                <img src={frontpageMenuEng} alt="coverpage" />
                <small>Menu & Kitchen</small>
                <h3>Restaurant Menu Engineering Course</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni quidem ratione odio id nulla aliquid nostrum adipisci officia ipsum nihil. </p>
                <a href={menuEngineeringPDF} download>Read More &#x2192; </a>
            </div>
            <div className="information-card">
                <img src={gamification_front} alt="coverpage" />
                <small>Gamification in Restaurant Business</small>
                <h3>Restaurants Coupons & Upselling</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni quidem ratione odio id nulla aliquid nostrum adipisci officia ipsum nihil. </p>
                <a href={gamificationPDF} download>Read More &#x2192; </a>
            </div>
        </div>
    </div>
    </>
  )
}

export default HomePageInfoSection