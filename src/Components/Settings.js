import React, {useState, useEffect, useContext} from 'react'
import Message from './Message'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { RestaurantInfoContext } from '../Pages/Restaurants/AdminHomePage'

function Settings() {

    const [showSlotMachine, setShowSlotMachine] = useState()
    const [ showCouponSlider, setShowCouponSlider] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const email = cookies.UserEmail

    const { restaurantInfo, setRestaurantInfo } = useContext(RestaurantInfoContext)


    const toggleBox=async(gameElement)=>{
        try {
            if(gameElement ==='slotMachine'){
                setShowSlotMachine(!showSlotMachine)
            } else {
                setShowCouponSlider(!showCouponSlider)
            }
            console.log(`Going to change ${gameElement} status`)
          const response = await axios.post(`https://mymenuserver-xu2x.onrender.com/managegames`, {email:email, gameElement: gameElement })
        } catch (error) {
          console.log(error)
        }
      }

      const fetchRestaurantDetails = async ()=>{
        console.log('reached')
        try {
            const response = await axios.get('https://mymenuserver-xu2x.onrender.com/fetchmenu', {params:{email:email}});
            setRestaurantInfo(response.data.fetchMenu)
            const slotMachineChecked = response.data.fetchMenu.isSlotMachineAdded
            const sliderChecked = response.data.fetchMenu.isCouponSliderAdded
            setShowSlotMachine(slotMachineChecked)
            setShowCouponSlider(sliderChecked)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(restaurantInfo === 'All Menu'){
            fetchRestaurantDetails()
        } else {
            const slotMachineChecked = restaurantInfo.isSlotMachineAdded
            const sliderChecked = restaurantInfo.isCouponSliderAdded
            setShowSlotMachine(slotMachineChecked)
            setShowCouponSlider(sliderChecked)
        }
        
    }, [])

  return (
    <>
    <Message />
        <h2>How you want to elevate your customer experience ?</h2>
        <p>Select all game elements you want to provide to your customers..</p>
        <div className="gamification-settings">
            <div className="games">
                <input type="checkbox" name="slotMachine" id="slotMachine" onChange={()=>toggleBox('slotMachine')} checked={showSlotMachine? 'checked': ''} />
                <label htmlFor="slotMachine">Slot Machine</label>
            </div>
            <div className="games">
                <input type="checkbox" name='slider' id='slider' onChange={()=>toggleBox('slider')} checked={showCouponSlider? 'checked': ''} />
                <label htmlFor="slider">Coupon Slider</label>
            </div>
        </div>
    </>
  )
}

export default Settings