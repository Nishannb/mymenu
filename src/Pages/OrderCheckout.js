import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import FoodMeter from '../Components/FoodMeter'
import NavBar from '../Components/NavBar'
import Slider from '../Components/Slider'
import { FoodMenuContext } from '../App'

function OrderItems ({items}){
    let remarks =[]
    if(items.remarks !== 'no remarks'){
        remarks = (JSON.parse(items.remarks))
    }
    return (
        <div className="menu">
                <div className="order-description">
                    <p>{items.itemName}<small>{remarks.map((remark)=><small key={remark}>{remark}</small> )} </small></p>
                    <small>x {items?.qty}</small> <br/>
                    <small className='description'>{items?.price * items?.qty}</small>
                </div>
            <h6>{items.discount}% off</h6>
        </div>
    )
}


function OrderCheckout() {

    const [ordersList, setOrdersList] = useState([])
    const [spiceLevel, setSpiceLevel ] = useState('Mild')
    const { foodItems } = useContext(FoodMenuContext)


    useEffect(()=>{
        const orders = JSON.parse(localStorage.getItem("List"))
        setOrdersList(orders)
    }, [])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const name = JSON.parse(localStorage.getItem('myMenuParams'))
            const id = JSON.parse(localStorage.getItem('myMenuTable'))
            const response = await axios.post("https://mymenuserver-xu2x.onrender.com/placeorder", {ordersList, spiceLevel, name, id})
            localStorage.setItem('List', JSON.stringify([]))
            window.location.reload()
            return
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <NavBar navBarItem='Home' />
        <FoodMeter level={spiceLevel} />
        {foodItems.isCouponSliderAdded && <Slider />}
        <div className='orders-container'>
            <div className="orders-card">
                { !ordersList.length && <p>No Items have been added yet</p> }
               { ordersList && ordersList.map((items)=><OrderItems items={items} key={`${items.itemName}${items.remarks}`} />) }
            </div>
            {ordersList && <div className="orderbutton">
                <form action="">
                    <div className="spices">
                        <p>How much spices do you want in your food?</p>
                        <ul>
                            <li> 
                                <input type="Radio" name="spice" onClick={()=>setSpiceLevel('Mild')}  required/>
                                <label htmlFor="spice">Mild</label>
                            </li>
                            <li> 
                                <input type="radio" name="spice" onClick={()=>setSpiceLevel('Medium')} required/>
                                <label htmlFor="spice">Medium</label>
                            </li>
                            <li> 
                                <input type="radio" name="spice" onClick={()=>setSpiceLevel('Hot')} required/>
                                <label htmlFor="spice">Hot</label>
                            </li>
                        </ul>
                    </div>
                    <button className='placeorder' onClick={handleSubmit}>Place Order</button>
                </form>
            </div>}  
        </div>
    </>
  )
}

export default OrderCheckout