import React from 'react'

function Error() {

  return (
    <div className='error'>
        <div className="instructions">
          <h4>This route path is currently not available. </h4>
          <a href="/admin/login">Click here if you want to login your Business account</a>
        </div>
        <p>If you got here scanning QR code, please re-scan your QR code....</p>
        <small>If nothing works, though chances are very slim, it might be that, QR code you are scanning might not be in operation. In that case, please ask for restaurant staffs for other QR code.</small>
    </div>
  )
}

export default Error