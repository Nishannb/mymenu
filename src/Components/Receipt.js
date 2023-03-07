import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { RestaurantInfoContext } from '../Pages/Restaurants/AdminHomePage'


function ListItems ({items}){

  const discountPrice = ((100- items.discount)/100) * items.price

  return (
      <tr>
          <td>{items.food}</td>
          <td>{items.qty}</td>
          <td>{items?.discount}%</td>
          <td>{discountPrice}</td>
      </tr>
  )
}

function Receipt() {

  const [cookies] = useCookies(['user'])
  const email = cookies.UserEmail 
  const [ receipt, setReceipt ] = useState(null)
  const [ totalBill, setTotalBill ]= useState(0)

  // Data from Context
  const { restaurantOrders } = useContext(RestaurantInfoContext)


  const clearTableBill = async()=>{
    try {
      const response = await axios.post('https://mymenuserver-xu2x.onrender.com/clearbill', {email:email, table: receipt})
      setReceipt()

  } catch (error) {
      console.log(error)
  }
  }

  const changeOrderList =(e)=>{
    let total = 0;
    let tableNum = Number(e.target.value)
    if(tableNum === 0) return setReceipt()
    const filterItems = restaurantOrders.filter((item)=>item.tableNo===tableNum)
    setReceipt(filterItems)
    for(let item of filterItems){
      let price = ((100- item.discount)/100) * item.price
      total = total + Math.round(price)
    }
    setTotalBill(total)
  }


  return (
    <>
        <div className="input-form">
          <label htmlFor="tableNo">Table No:</label>
          <input type="number" name='tableNo' placeholder='Enter Table Number..' onChange={changeOrderList } />
          
        </div>
        <div className="orders-container">
            <table className="orders-card">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>QTY</th>
                            <th>Discount</th>
                            <th>Price after Discount</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { receipt && receipt.map((items)=> <ListItems key={items._id} items={items} setTotalBill={setTotalBill} totalBill={totalBill} />) }           
                    </tbody>
                    
            </table>
            {receipt && totalBill && <div className="billing">
            <h4>Total: {totalBill ? totalBill: ''}</h4>
            <p>The total already include discounts</p>
            <button onClick={clearTableBill}>Clear Table Bill</button>
          </div>}
          {receipt && <p>Please enter respective table number to get receipt.</p>}
          </div>
          
    </>
  )
}

export default Receipt