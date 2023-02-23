import React, { useEffect, useState, useContext } from 'react'
import TinderCard from 'react-tinder-card'
import swipe from '../icons/swipe.png'
import { FoodMenuContext } from '../App'
import axios from 'axios'

function MakeSwipeCard({swiped, outOfFrame, items}){

    const Cart = JSON.parse(localStorage.getItem('List'))
    const randomNum = Math.floor(Math.random() * ((Cart.length - 1) - 0 + 1)) + 0;
    const selectedAddOn = Cart[randomNum]
    if(items.itemName.includes(selectedAddOn.itemName)) return

    return(
        <TinderCard
            className="swipe" 
            key={items._id} 
            onSwipe={(dir) => swiped(dir, items, selectedAddOn)} 
            onCardLeftScreen={()=> outOfFrame()}>
            <div style={{backgroundImage: "url(" + items.itemImage[0].url + ")"}} className='card'>
                <div className="item-description">
                    <h3>GET <span>{items.itemName}</span> <br /> with {selectedAddOn.itemName}</h3>
                    <div className="price-description">
                        <p>{items.price + selectedAddOn.price} yen</p>
                        <small>{Math.floor((items.price  + selectedAddOn.price)* 0.8)} yen</small>
                    </div>
                </div> 
            </div>
         </TinderCard>
    )
}

function Slider() {

    const [ getCartItems, setGetCartItems ] = useState()
    const [displaySwiper, setDisplaySwiper ] = useState()
    const [ coupon, setCoupon ] = useState()
    const [ userEmail, setUserEmail ] = useState()
    const [ couponSendSuccess, setCouponSendSuccess ] = useState(false)
    const { addOnMenu } = useContext(FoodMenuContext)

    const swiped =(dir, item, addOnItem)=>{
        if(dir === 'right' || dir === 'up' || dir === 'down'){
            const coupon = `Save 20% on your next visit. Get ${item.itemName} and ${addOnItem.itemName}, just at ${Math.floor((item.price + addOnItem.price) * 0.7)} yen`
            setCoupon(coupon)
            setDisplaySwiper(false)
        }
    }

    const outOfFrame =()=>{
        // console.log('outofframe')
        return
    }

    useEffect(()=>{
        const Cart = JSON.parse(localStorage.getItem('List'))
        if(!Cart) localStorage.setItem('List', JSON.stringify([]))
        if(Cart.length === 0) return setGetCartItems()
        setDisplaySwiper(true)
        setGetCartItems(Cart)
    }, [])

    const saveCoupon=async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/savecoupons', {email: userEmail, coupon: coupon})
            setCouponSendSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    { !displaySwiper && coupon && <div className='coupon-container'>
        <p>{coupon}</p>
        <small>Get your coupon: </small> <br />
        <input type="email" placeholder='Email' name='email' onChange={(e)=>setUserEmail(e.target.value)} />
        <button onClick={saveCoupon}>Submit</button>
    </div> }

    {couponSendSuccess && <p>Coupon will be send to your email shortly! Have a great day.</p> }
    {displaySwiper && <div className='cardslider-container'> 
        <div className="direction-guide">
            <img src={swipe} alt="swipe" className='left-side' />
            <small>Slide Left</small>
        </div>
        <div className="swiper-container">
            <h4><span>C</span>oupon <span>D</span>eals</h4>
            <p>Swipe Right to grab Coupon for your best Food</p>
            {getCartItems && addOnMenu && <div className="card-container">
                {addOnMenu.map((items)=> <MakeSwipeCard swiped={swiped} outOfFrame={outOfFrame} items={items} key={items._id} />) }  
        </div>}
        </div>
        <div className="direction-guide">
            <img src={swipe} alt="swipe" className='right-side' />
            <small>Slide Right</small>
        </div>
    </div>}
    </>
  )
}

export default Slider