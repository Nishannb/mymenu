import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'
import { useContext } from 'react'
import { RestaurantInfoContext } from './Restaurants/AdminHomePage'
import order from '../assests/order.mp3'


const socket = io.connect('https://mymenuserver-xu2x.onrender.com', {
    rejectUnauthorized: false,
    transports: ['websocket', 'polling'],
    vary: origin,
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionAttempts: Infinity,
    randomizationFactor: 0.5,
    })

    socket.on('connect', function(){
        console.log('connected')
        // socket.socket.connect();
      });

    socket.on('disconnect', function(){
        console.log('disconnected')
        // socket.socket.connect();
     });
     socket.on('reconnect', function(){
        console.log('reconnected')
        // socket.socket.connect();
      });

    socket.on('connecting', function(){
        console.log('connecting')
        // socket.socket.connect();
     });
     socket.on('connect_failed', function(){
        console.log('connect failed')
        // socket.socket.connect();
      });

    socket.on('close', function(){
        console.log('close')
        // socket.socket.connect();
     });
     socket.on('reconnecting', function(){
        console.log('reconnecting')
        // socket.socket.connect();
      });

    socket.on('reconnect_failed', function(){
        console.log('reconnect failed')
        // socket.socket.connect();
     });
     socket.on("connect_error", () => {
        console.log('connect error')
        socket.io.opts.transports = ["polling", "websocket"];
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

    const [ tableItems, setTableItems ] = useState()
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
            setRestaurantOrders(data.ListOfOrders)
        });

        // socket.on('error', function(){
        //     console.log('inside useeffect reconnecting')
        //     socket.socket.connect();
        //   });
    
        // socket.on('disconnect', function(){
        //     console.log('inside useeffect disconnected and reconnecting')
        //     socket.socket.connect();
        //  });
        socket.on("connect_error", () => {
            console.log('connect error')
            socket.io.opts.transports = ["polling", "websocket"];
          });
        socket.on('connect', function(){
            console.log('connected')
            // socket.socket.connect();
          });
    
        socket.on('disconnect', function(){
            console.log('disconnected')
            // socket.socket.connect();
         });
         socket.on('reconnect', function(){
            console.log('reconnected')
            // socket.socket.connect();
          });
    
        socket.on('connecting', function(){
            console.log('connecting')
            // socket.socket.connect();
         });
         socket.on('connect_failed', function(){
            console.log('connect failed')
            // socket.socket.connect();
          });
    
        socket.on('close', function(){
            console.log('close')
            // socket.socket.connect();
         });
         socket.on('reconnecting', function(){
            console.log('reconnecting')
            // socket.socket.connect();
          });
    
        socket.on('reconnect_failed', function(){
            console.log('reconnect failed')
            // socket.socket.connect();
         });
    }, [socket])

    const joinRoom = ()=>{
        socket.emit('join_room', email)
    }
    
    useEffect(()=>{
        sendMessage()
    }, [])

    useEffect(()=>{
        socket.on('connect', function(){
            console.log('connected')
            // socket.socket.connect();
          });
    
        socket.on('disconnect', function(){
            console.log('disconnected')
            // socket.socket.connect();
         });
         socket.on('reconnect', function(){
            console.log('reconnected')
            // socket.socket.connect();
          });
    
        socket.on('connecting', function(){
            console.log('connecting')
            // socket.socket.connect();
         });
         socket.on('connect_failed', function(){
            console.log('connect failed')
            // socket.socket.connect();
          });
    
        socket.on('close', function(){
            console.log('close')
            // socket.socket.connect();
         });
         socket.on('reconnecting', function(){
            console.log('reconnecting')
            // socket.socket.connect();
          });
    
        socket.on('reconnect_failed', function(){
            console.log('reconnect failed')
            // socket.socket.connect();
         });
         socket.on("connect_error", () => {
            console.log('connect error')
            socket.io.opts.transports = ["polling", "websocket"];
          });
    })

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
                        { tableItems && tableItems.map((items)=> <ListItems key={items._id} items={items} />) }

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