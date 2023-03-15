import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'
import { useContext } from 'react'
import { RestaurantInfoContext } from './Restaurants/AdminHomePage'
import order from '../assests/order.mp3'


const socket = io.connect('https://mymenuserver-xu2x.onrender.com', {
    rejectUnauthorized: false,
    transports: ["websocket",'polling'],
    vary: origin,
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionAttempts: Infinity,
    randomizationFactor: 0.5,
    })

    socket.on("connect_error", () => {
        console.log('connect error')
        socket.io.opts.transports = ["polling", "websocket"];
      });

      socket.on("disconnect", (reason) => {
        console.log(socket.connected, 'connection details')
        if (reason === "io server disconnect") {
            console.log('server disconneted')
            socket.connect();
        } else if(reason === "io client disconnect"){
            console.log('client disconneted')
            socket.connect();
        }
        // else the socket will automatically try to reconnect
      });
    
function ListItems ({items}){

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
            { items.remarks && items?.remarks !== 'no remarks' &&  <td>{JSON.parse(items?.remarks).map(remark => `${remark} `)}</td>}
            { items?.remarks === 'no remarks' && <td>no remark</td> }
            <td>{items.spiceLevel}</td>
            <td><button onClick={deleteItem}>{!items.status ? 'Served':'Done' }</button></td>
        </tr>
    )
}

function DashBoard() {

    const [ tableItems, setTableItems ] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const email = cookies.UserEmail
    
    // Data from Context
    const { restaurantOrders, setRestaurantOrders } = useContext(RestaurantInfoContext)
    
    const sendMessage =()=>{
        socket.emit('SENDMSG',{message: 'hello'})
        joinRoom()
    }


    useEffect(()=>{
        socket.on("receive_msg", (data)=>{
            new Audio(order).play()
            console.log('data', data)
            if(data === 'true') setTableItems(true)
        });

        socket.on("connect_error", () => {
            console.log('connect error')
            socket.io.opts.transports = ["polling", "websocket"];
          });
        
          socket.on("disconnect", (reason) => {
            console.log(socket.connected, 'connection details')
            if (reason === "io server disconnect") {
                console.log('server disconneted')
                socket.connect();
            } else if(reason === "io client disconnect"){
                console.log('client disconneted')
                socket.connect();
            }
            // else the socket will automatically try to reconnect
          });
        
    }, [socket])

    useEffect(()=>{
        socket.on("connect_error", () => {
            console.log('connect error')
            socket.io.opts.transports = ["polling", "websocket"];
        });

        socket.on("disconnect", (reason) => {
            console.log(socket.connected, 'connection details')
            if (reason === "io server disconnect") {
                console.log('server disconneted')
                socket.connect();
            } else if(reason === "io client disconnect"){
                console.log('client disconneted')
                socket.connect();
            }
            // else the socket will automatically try to reconnect
          });
    })

    const joinRoom = ()=>{
        socket.emit('join_room', email)
    }
    
    useEffect(()=>{
        sendMessage()
    }, [])

    const fetchOrders = async()=>{
        try {
          const response = await axios.get('https://mymenuserver-xu2x.onrender.com/orders', {params: {email:email}})
          setRestaurantOrders(response.data)
          setTableItems(false)
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <div className='dashboard-container'>
         <div className="orders-container">
            {tableItems === true && <p className='notification'>New Orders notification has been received!! Click "New Order" button to fetch orders.</p> }
            {!tableItems ===true && <button className='noorder'>No Order</button> }
            {tableItems === true && <button className='neworder' onClick={fetchOrders}>New Order</button> }
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
                        { restaurantOrders && restaurantOrders.map((items)=> <ListItems key={items._id} items={items} />) }
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