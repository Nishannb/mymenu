import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { useCookies } from 'react-cookie'


function ListItems ({items}){

  const discountPrice = ((100- items.discount)/100) * items.price

  return (
      <tr>
          <td>{items.food}</td>
          <td>{items.qty}</td>
          <td>{items?.discount}%</td>
          <td>{discountPrice} yen</td>
      </tr>
  )
}

function Receipt() {

  const [cookies] = useCookies(['user'])
  const email = cookies.UserEmail 
  const [ receipt, setReceipt ] = useState()
  const [ tableItems, setTableItems ] = useState()
  const [ totalBill, setTotalBill ]= useState(0)

  const fetchOrders = async(e)=>{
    try {
        const response = await axios.get('https://mymenuserver-xu2x.onrender.com/orders', {params: {email:email}})
        setTableItems(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  const clearTableBill = async()=>{
    try {
      const response = await axios.post('https://mymenuserver-xu2x.onrender.com/clearbill', {email:email, table: receipt})
      window.location.reload()
  } catch (error) {
      console.log(error)
  }
  }

  const changeTableNumber =(e)=>{
    let total = 0;
    const filterItems = tableItems.filter((item)=>item.tableNo===Number(e.target.value))
    setReceipt(filterItems)
    for(let item of filterItems){
      let price = ((100- item.discount)/100) * item.price
      total = total + Math.round(price)
    }
    setTotalBill(total)
  }
  useEffect(()=>{
    fetchOrders()
  }, [])

  return (
    <>
        <NavBar navBarItem='Back to Home' />
        <div className="input-form">
          <label htmlFor="tableNo">Table No:</label>
          <input type="number" name='tableNo' placeholder='Table Number..' onChange={changeTableNumber } />
          
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
          </div>
          {receipt && totalBill && <div className="billing">
            <h4>Total: {totalBill ? totalBill: ''} yen</h4>
            <p>The total already include discounts</p>
            <button onClick={clearTableBill}>Clear Table Bill</button>
          </div>}
    </>
  )
}

export default Receipt