import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import NavBar from './NavBar';

function EditMenu() {
    const [cookies, setCookies, removeCookies] = useCookies(['user'])
    const email = cookies.UserEmail

    const[menuData, setMenuData] = useState({
        email: cookies.UserEmail,
        itemName: '',
        price: '',
        description: '',
        foodCategories: '',
        todaySpecial: '',
        hasSetMenu: ''
    });

    const [selectedFile, setSelectedFile ] = useState()

    const handleAddOnOptions = (e)=>{
        const value = e.target.value
        // setAddOnOptionsInput((prevState)=>({
        //     ...prevState,
        //     [value]: value
        // }))
    }
    const handleChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        // setMenuData((prevState)=>({
        //     ...prevState,
        //     [name]: value,
        // }))
    }

    const fetchAddOnOptions = async()=>{
        // try {
        //     const response = await axios.get('http://localhost:8080/fetchaddonoptions', {params: {email:email}})
        //     setFetchedAddOnOptions(response.data.sendData)

        // } catch (error) {
        //     console.log(error)
        // }
    }

    useEffect(()=>{
        fetchAddOnOptions()
    },[menuData.foodCategories === 'Set menu'])

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
            // formData.append('hasSetMenu', JSON.stringify(addOnOptionsInput))
            formData.append('foodimage', selectedFile)
            
            const response = await axios.post('http://localhost:8080/admin/menu', formData )

            window.location.reload()
            
        } catch(e) {
            console.log(e)
        }
    }
  return (
    <div className='adminmenu-container'>
        <NavBar navBarItem='Back to Manage' leftBarItem='Logout' />
        <div className="addmenu-card">
            <form onSubmit={publishItemsForMenu} encType="multipart/form-data" >
                <h2>Edit items from your Menu</h2>
                <input type="text" placeholder='Item Name' name='itemName' value={menuData.itemName} onChange={handleChange} required />
                <input type="Number" placeholder='price' name='price' value={menuData.price} onChange={handleChange} required/>
                <input type="file" className="foodimage" name='image' onChange={ handleFile }  />
                <select name="foodCategories" defaultValue={'Select One'} id='foodCategories'onChange={ handleChange } required>
                    <option value="Select One" disabled >Select One</option>
                    <option value="Set menu">Set Menu</option>
                    <option value="Side menu">Side Menu</option>
                    <option value="Drinks">Drinks</option>
                </select>
                { menuData.foodCategories === 'Set menu' && <small>Wait & Check all Add On option required for this item.</small> }
                {/* <div className="fieldset-choices">{ menuData.foodCategories === 'Set menu' && fetchedAddOnOptions && fetchedAddOnOptions.map((addOn)=> <fieldset key={addOn.optionName}><input type='checkbox' value={addOn.optionName} onClick={handleAddOnOptions} /> <label >{addOn.optionName}</label> </fieldset> ) } </div> */}
                <textarea name="description" id="description" value={menuData.description} cols="10" rows="5" onChange={handleChange} />
                <div className="btns">
                    <button type='submit' className='publish' onClick={publishItemsForMenu} >Publish Menu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditMenu