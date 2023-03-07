import React from 'react'
import { useContext } from 'react'
import { AdminHomePageContext } from '../Pages/Restaurants/AdminHomePage'
function VNavigation() {

  const { setShowManageAccount, setShowGetQr, setShowDashboard, setShowReceipt, setShowSettings  } = useContext(AdminHomePageContext)

  const handleDisplay =(clickedOption)=>{
    setShowGetQr(false)
    setShowManageAccount(false)
    setShowDashboard(false)
    setShowReceipt(false)
    setShowSettings(false)
    clickedOption(true)
  }
  return (
    <div className='vnavigation-container'>
        <div className="vnavigation-card">
            <a onClick={()=>handleDisplay(setShowDashboard) }>Orders</a>
            <a onClick={()=>handleDisplay(setShowReceipt) }>Receipt</a>
            <a onClick={()=>handleDisplay(setShowManageAccount) }>Menu</a>
            <a onClick={()=>handleDisplay(setShowGetQr) }>Get QR</a>
            <a onClick={()=> handleDisplay(setShowSettings)}>Settings</a>
        </div>
    </div>
  )
}

export default VNavigation