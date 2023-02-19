import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FoodMeter from '../Components/FoodMeter'
import NavBar from '../Components/NavBar'
import Slider from '../Components/Slider'

function OrderItems ({items}){
    return (
        <div className="menu">
                <div className="order-description">
                    <p>{items.itemName}</p>
                    <small>{items?.qty}</small> <br/>
                    <small className='description'>{items?.price} yen</small>
            </div>
        </div>
    )
}


function OrderCheckout() {

    const [ordersList, setOrdersList] = useState([])
    const [spiceLevel, setSpiceLevel ] = useState('Mild')

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
        <NavBar navBarItem='home' />
        <FoodMeter level={spiceLevel} />
        <Slider />
        <div className='orders-container'>
            <div className="orders-card">
                { !ordersList.length && <p>No Items have been added yet</p> }
               { ordersList && ordersList.map((items)=><OrderItems items={items} key={items.itemName} />) }
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