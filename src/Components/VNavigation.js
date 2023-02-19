import React from 'react'

function VNavigation() {
  return (
    <div className='vnavigation-container'>
        <div className="vnavigation-card">
            <a href="/admin/dashboard">Orders</a>
            <a href="/admin/manage">Manage Menu</a>
            <a href="/admin/getQR">Get QR</a>
        </div>
    </div>
  )
}

export default VNavigation