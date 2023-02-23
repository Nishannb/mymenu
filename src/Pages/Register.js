import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode'

function Register() {

    let navigate = useNavigate('')

    const [ firstThreeQR, setFirstThreeQR ] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const generateQRCode =()=>{
        let urlArray=[]
        const urlName = (formData.shopName).replace(/\s/g, '')
        for(let i=1; i<=5; i++){
            let url = `https://mymenuserver-xu2x.onrender.com/${urlName}/${i}`
            QRCode.toDataURL(url,{
                width: 280,
                margin:1
             }, (err, url)=>{
            if(err) return console.error(err)
            urlArray.push(url)
            })
        }
        setFirstThreeQR(urlArray)
    }

    const[formData, setFormData] = useState({
        shopName: '',
        email:"",
        phoneNum: "",
        password: "",
        RePassword: "",
        menu:[],
        orders:[]
    })

    const handleChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(()=>{
        if(formData.shopName) generateQRCode()
    }, [formData.shopName])

   
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/admin/register', {formData, firstThreeQR})
            setCookie("UserEmail", response.data.UserId)
            setCookie("AuthToken", response.data.token)

            navigate('/admin/getQR');

            window.location.reload()
               
        } catch (error) {
            console.log('Error', error)
        }
    }

  return (
    <>
    <div className='boarding-container'>
        <div className="boarding-form">
            <div className="heading">
                <h1>myMenu Admin</h1>
                <p>Register your account</p>
            </div>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" placeholder='Name of your restaurant' value={formData.shopName} name='shopName' id='shopName' onChange={handleChange} required />
                <input type="email" name="email" id="email" value={formData.email} placeholder='Email' onChange={handleChange} required />
                <input type="text" placeholder='Phone Number' value={formData.phoneNum} name='phoneNum' id='phone-num' onChange={handleChange} />
                <input type="password" placeholder='Password' value={formData.password} name="password" onChange={handleChange} required />
                <input type="password" placeholder='Re-Confirm Password' value={formData.RePassword} name="RePassword" onChange={handleChange} required/>
                <button type='submit'>Register</button>
                <p>Already have an account ?</p>
            </form>
            <a href="/admin/login">Login</a>
        </div>
    </div>
    </>
  )
}

export default Register