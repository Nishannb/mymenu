import React, {useState} from 'react'
import NavBar from './NavBar'
import QRCode from 'qrcode'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import axios from 'axios'
import VNavigation from './VNavigation'
import Message from './Message'
import StripeContainer from './StripeContainer'


function ListQR({qr, QRNum, isPremium}){
    return(
        <div className="qr-card">
            <img src={qr} alt={qr+QRNum}/>
            <figcaption><h3>Scan Me</h3></figcaption>
            <h4>QR for Table {QRNum + 1} <br /> <small>{ isPremium || QRNum < 3 ? '': '(Expired: Upgrade to Premium)'}</small></h4>
            <a href={qr} download={`qrCode-table${QRNum + 1}.png`}>Download QR</a>
        </div>
    )
}

function GetQR() {

    const [ qrCode, setQrCode ]= useState([])
    const [ cookies ] = useCookies()
    const [newQR, setNewQR ]= useState(0)
    const [ displayPayment, setDisplayPayment] = useState(false)
    const [ isPremium, setIsPremium] = useState(false)
    
    const email = cookies.UserEmail

    const generateQRCode =async(e)=>{
        e.preventDefault()
        let numberofQR = Number(newQR) + 3
        let urlArray=[]
        for(let i=4; i<=numberofQR; i++){
            let url = `https://mymenu-v6k6.onrender.com/${email}/${i}`
            QRCode.toDataURL(url,{
                width: 280,
                margin:1
             }, (err, url)=>{
            if(err) return console.error(err)
            urlArray.push(url)
            })
        }
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/newqr', {email:email, qr: urlArray});
            const success = response.status === 201;
            if(success) window.location.reload()
            
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRestaurantDetails = async ()=>{
        try {
            const response = await axios.get('https://mymenuserver-xu2x.onrender.com/fetchmenu', {params:{email:email}});
            const qrData = response.data.fetchMenu.totalTable
            const shouldDisplayPremium = response.data.fetchMenu.accountType.isPremium
            setIsPremium(shouldDisplayPremium)
            setQrCode(qrData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchRestaurantDetails()
    }, [])


  return (
    <>
        <NavBar leftBarItem='Logout' />
        <VNavigation />
        <div className='getqr-container'>
            <div className="getqr-card"> 
                <Message />
                <h3>Below QR codes</h3>
                {isPremium && <div className="getmoreqr-input">
                    <h3>Add More QR</h3>
                    <input type="number" placeholder='How many QR Codes' onChange={(e)=>setNewQR(e.target.value)}/>
                    <button onClick={generateQRCode} disabled={!newQR ? true: false}>Generate</button>
                </div>}
                <div className="qr-list">
                    {qrCode && qrCode.map((qr)=> <ListQR key={qr} qr={qr} QRNum={qrCode.indexOf(qr)} isPremium={isPremium} /> ) }
                </div>
                {!isPremium &&  <div className="premiumaccount">
                    <p className='premiumaccount-notice'> <strong>Notice: First 3 QR code of myMenu App will always be free.</strong> <br /> However, Under 'FIRST 50' campaign, we are also offering 70% off on our premium account subscription to our first 50 users. Get premium only at <span>¥4800</span> valid for next 3 month (¥1600/monthly).</p>
                    {displayPayment && <StripeContainer />}
                </div>}
                {!isPremium && <h4>Do you have need more table QR? Upgrade to Premium account. <span onClick={()=>setDisplayPayment(true)}>Click Here</span></h4>}
            </div>
        </div> 
    </>
  )
}

export default GetQR