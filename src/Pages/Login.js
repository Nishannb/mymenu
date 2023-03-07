import axios from 'axios';
import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate('')

    const [ userId, setUserId ] = useState();
    const [ userPwd, setUserPwd ] = useState(); 
    const [cookies, setCookie, removeCookie] = useCookies(['user'])


    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/admin/login', {userId, userPwd})
            console.log(response.data.UserEmail,response.data.token)
            setCookie("UserEmail", response.data.UserEmail)
            setCookie("AuthToken", response.data.token)

            navigate('/admin/manage');
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
                <p>Login your account</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder='Email' onChange={(e)=>setUserId(e.target.value)} required />
            
                <input type="password" placeholder='password' name="password" onChange={(e)=>setUserPwd(e.target.value)} />
                <button type='submit'>Login</button>
                <p>Haven't registered yet ?</p>
            </form>
            <a href="/admin/register">Create new account</a>
        </div>
    </div>
    </>
  )
}

export default Login