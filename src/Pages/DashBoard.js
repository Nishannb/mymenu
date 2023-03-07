import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'
import { useContext } from 'react'
import { RestaurantInfoContext } from './Restaurants/AdminHomePage'


const socket = io.connect('https://mymenuserver-xu2x.onrender.com')


function ListItems ({items, email}){

    const deleteItem =async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/clearorder', { items:items })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr className={!items.status ? '': 'order-done'}>
            <td>{items.food}</td>
            <td>x {items.qty}</td>
            <td>Table {items.tableNo}</td>
            <td>{JSON.parse(items?.remarks).map(remark => `${remark} `)}</td>
            <td>{items.spiceLevel}</td>
            <td><button onClick={deleteItem}>{!items.status ? 'Served':'Done' }</button></td>
        </tr>
    )
}

function DashBoard() {

    const [ tableItems, setTableItems ] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const email = cookies.UserEmail
    
    // Data from Context
    const { restaurantOrders } = useContext(RestaurantInfoContext)
    
    const sendMessage =()=>{
        socket.emit('SENDMSG',{message: 'hello'})
        joinRoom()
    }

    useEffect(()=>{
        socket.on("receive_msg", (data)=>{
            setTableItems(data.ListOfOrders)
        }) 
    }, [socket])

    const joinRoom = ()=>{
        socket.emit('join_room', email)
    }

    // const fetchOrders = async(e)=>{
    //     try {
    //         const response = await axios.get('https://mymenuserver-xu2x.onrender.com/orders', {params: {email:email}})
    //         setTableItems(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    useEffect(()=>{
        sendMessage()
    }, [])

  return (
    <div className='dashboard-container'>
         <div className="orders-container">
            <table className="orders-card">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>QTY</th>
                            <th>Table No.</th>
                            <th>Remarks</th>
                            <th>Spice</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { restaurantOrders && restaurantOrders.map((items)=> <ListItems key={items._id} items={items} email={email} />) }
                        
                    </tbody>   
            </table>
            <div>
                { !restaurantOrders && <p>Select any table No for checking orders</p> }
            </div>
         </div>
    </div>
  )
}

export default DashBoard