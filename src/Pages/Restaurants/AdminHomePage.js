import React, { useState } from 'react'
import NavBar from '../../Components/NavBar'
import VNavigation from '../../Components/VNavigation'
import ManageAccount from '../ManageAccount'
import AddMenu from './AddMenu'
import { createContext } from 'react'
import GetQR from '../../Components/GetQR'
import DashBoard from '../DashBoard'
import Receipt from '../../Components/Receipt'

export const AdminHomePageContext = createContext({})
export const ItemSelectedToEdit = createContext({})

function AdminHomePage() {

    const [ showDashBoard, setShowDashboard]= useState()
    const [ showManageAccount, setShowManageAccount ] = useState(true)
    const [ showMenuEditInterface, setShowMenuEditInterface] = useState(false)
    const [ showGetQr, setShowGetQr ] = useState()
    const [ showReceipt, setShowReceipt] = useState()
    const [editThisItem, setEditThisItem ] = useState()

  return (
    <>
    <AdminHomePageContext.Provider value={{ showManageAccount, setShowManageAccount, showGetQr, setShowGetQr, showDashBoard, setShowDashboard, showReceipt, setShowReceipt }}>
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

            </div>
        </ItemSelectedToEdit.Provider>
    </AdminHomePageContext.Provider>
    </>
  )
}

export default AdminHomePage