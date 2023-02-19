import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import axios from 'axios';
import { useCookies } from 'react-cookie';

function AdminMenu() {

    const [cookies] = useCookies(['user'])

    const[menuData, setMenuData] = useState({
        email: cookies.UserEmail,
        itemName: '',
        price: '',
        description: '',
        foodCategories: '',
        todaySpecial: ''
    });

    const [selectedFile, setSelectedFile ] = useState()

    const handleChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setMenuData((prevState)=>({
            ...prevState,
            [name]: value,
        }))
    }

    const handleFile =(e)=>{
        const file = e.target.files[0]
        setSelectedFile(file)
    }

    const publishItemsForMenu = async(e)=>{
        e.preventDefault()
        try{

            const formData = new FormData();
            formData.append('email', menuData.email )
            formData.append('itemName', menuData.itemName)
            formData.append('price', menuData.price)
            formData.append('description', menuData.description)
            formData.append('foodCategories', menuData.foodCategories)
            formData.append('foodimage', selectedFile)
            
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/admin/menu', formData )

            window.location.reload()
            
        } catch(e) {
            console.log(e)
        }
    }
  return (
    <div className='adminmenu-container'>
        <NavBar navBarItem='Back to Manage' />
        <div className="addmenu-card">
            <form onSubmit={publishItemsForMenu} encType="multipart/form-data" >
                <h2>Add To Your Menu</h2>
                <input type="text" placeholder='Item Name' name='itemName' value={menuData.itemName} onChange={handleChange} required />
                <input type="Number" placeholder='price' name='price' value={menuData.price} onChange={handleChange} required/>
                <input type="file" className="foodimage" name='image' onChange={ handleFile }  />
                <select name="foodCategories" defaultValue={'Select One'} id='foodCategories'onChange={ handleChange } required>
                    <option value="Select One" disabled >Select One</option>
                    <option value="Set menu">Set Menu</option>
                    <option value="Side menu">Side Menu</option>
                    <option value="Drinks">Drinks</option>
                </select>
                <textarea name="description" id="description" value={menuData.description} cols="10" rows="5" onChange={handleChange} />
                <div className="btns">
                    <button type='submit' className='publish' onClick={publishItemsForMenu} >Publish Menu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AdminMenu