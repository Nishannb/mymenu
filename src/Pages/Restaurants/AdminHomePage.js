import React, { useState, createContext, useEffect } from 'react'
import NavBar from '../../Components/NavBar'
import VNavigation from '../../Components/VNavigation'
import ManageAccount from '../ManageAccount'
import AddMenu from './AddMenu'
import GetQR from '../../Components/GetQR'
import DashBoard from '../DashBoard'
import Receipt from '../../Components/Receipt'
import Settings from '../../Components/Settings'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export const AdminHomePageContext = createContext({})
export const ItemSelectedToEdit = createContext({})
export const RestaurantInfoContext = createContext({})

function AdminHomePage() {

    const [ showDashBoard, setShowDashboard]= useState(true)
    const [ showManageAccount, setShowManageAccount ] = useState(false)
    const [ showMenuEditInterface, setShowMenuEditInterface] = useState(false)
    const [ showGetQr, setShowGetQr ] = useState()
    const [ showReceipt, setShowReceipt] = useState()
    const [editThisItem, setEditThisItem ] = useState()
    const [ showSettings, setShowSettings] = useState(false)
    const [cookies] = useCookies(['user'])
    const email = cookies.UserEmail

    // State for holding orders details 
    const [ restaurantOrders, setRestaurantOrders ] = useState()

    // State for holding Menu & QR items
    const [ restaurantInfo, setRestaurantInfo ] = useState('All Menu')


    const fetchOrders = async()=>{
        try {
          const response = await axios.get('https://mymenuserver-xu2x.onrender.com/orders', {params: {email:email}})
          setRestaurantOrders(response.data) 
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{
        fetchOrders()
      }, [])

  return (
    <>
    <RestaurantInfoContext.Provider value={{ restaurantOrders, setRestaurantOrders, restaurantInfo, setRestaurantInfo }} >
    <AdminHomePageContext.Provider value={{ showManageAccount, setShowManageAccount, showGetQr, setShowGetQr, showDashBoard, setShowDashboard, showReceipt, setShowReceipt, showSettings, setShowSettings }}>
        <ItemSelectedToEdit.Provider value={{ editThisItem, setEditThisItem, showMenuEditInterface, setShowMenuEditInterface }}>
            <NavBar navBarItem='Logout' />
            <div className="adminHomePageBody-section">

                <VNavigation />
                <hr />

                {showManageAccount && <ManageAccount />}
                {showManageAccount && <hr /> }
                { showManageAccount && showMenuEditInterface && <div className='manage-menu-container'>
                    <AddMenu items={editThisItem} />    
                </div>}

                { showManageAccount && !showMenuEditInterface && <p className='editmenu-message'>Click on "+" button to add new item or select any pre-exisiting items by clicking to edit</p> }

                {showGetQr && <GetQR />}

                {showDashBoard && <DashBoard />}

                {showReceipt && <div className='receipt-section'>
                    <Receipt />  
                </div>}

                {showSettings && <div className='settings-container'>
                    <Settings />
                </div>}

            </div>
        </ItemSelectedToEdit.Provider>
    </AdminHomePageContext.Provider>
    </RestaurantInfoContext.Provider>
    </>
  )
}

export default AdminHomePage