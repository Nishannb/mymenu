import React from 'react'
import { useContext } from 'react'
import { AdminHomePageContext } from '../Pages/Restaurants/AdminHomePage'
function VNavigation() {

  const { setShowManageAccount, setShowGetQr, setShowDashboard, setShowReceipt, setShowSettings, setShowCustomerReviews } = useContext(AdminHomePageContext)

  const handleDisplay =(clickedOption)=>{
    setShowGetQr(false)
    setShowManageAccount(false)
    setShowDashboard(false)
    setShowReceipt(false)
    setShowSettings(false)
    setShowCustomerReviews(false)
    clickedOption(true)
  }
  return (
    <div className='vnavigation-container'>
        <div className="vnavigation-card">
            <a href='#' onClick={()=>handleDisplay(setShowDashboard) }>Orders</a>
            <a href='#' onClick={()=>handleDisplay(setShowReceipt) }>Receipt</a>
            <a href='#' onClick={()=>handleDisplay(setShowManageAccount) }>Menu</a>
            <a href='#' onClick={()=>handleDisplay(setShowGetQr) }>Get QR</a>
            <a href='#' onClick={()=>handleDisplay(setShowCustomerReviews) }>Customer Reviews</a>
            <a href='#' onClick={()=> handleDisplay(setShowSettings)}>Settings</a>
        </div>
    </div>
  )
}

export default VNavigation