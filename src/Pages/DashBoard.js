import React,{ useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import VNavigation from '../Components/VNavigation'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')


function ListItems ({items, email}){

    const deleteItem =async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/clearorder', { items:items })
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

    const fetchOrders = async(e)=>{
        try {
            const response = await axios.get('http://localhost:8080/orders', {params: {email:email}})
            setTableItems(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        fetchOrders()
        sendMessage()
    }, [])

  return (
    <div className='dashboard-container'>
         {/* <NavBar navBarItem='View Receipt' leftBarItem='Logout'/>
         <VNavigation /> */}
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
                        { tableItems && tableItems.map((items)=> <ListItems key={items._id} items={items} email={email} />) }
                        
                    </tbody>   
            </table>
            <div>
                { !tableItems && <p>Select any table No for checking orders</p> }
            </div>
         </div>
    </div>
  )
}

export default DashBoard