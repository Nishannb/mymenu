import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar';
import VNavigation from '../Components/VNavigation';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function ListItems({items, email}){

  const [ isChecked, setIsChecked ] = useState('')
  const [ isAddOn, setIsAddOn ] = useState('')

  const toggleBox=async(e, todo)=>{
    let urlPath;
    const foodItem = e.target.parentElement.parentElement.children[1].innerHTML
    if(todo === 'specials'){
      urlPath = 'edit'
      setIsChecked(!isChecked)
    } else {
      urlPath= 'editaddon'
      setIsAddOn(!isAddOn)
    }
    try {
      const response = await axios.post(`https://mymenuserver-xu2x.onrender.com/${urlPath}/`, {email:email, foodItem: foodItem })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(items.todaySpecial) setIsChecked(true)
    if(items?.isAddOn) setIsAddOn(true)
  }, [])

  const handleDelete =(e)=>{
    console.log(e.target.parentElement.children[1].innerHTML)
  }

  return(
    <tr>
      <td><img src={items.itemImage[0].url} alt={items.itemName} /></td>
      <td>{items.itemName}</td>
      <td>{items.price} yen</td>
      <td><input type="checkbox" name="special" id="special" onChange={(e)=>toggleBox(e, 'specials')} checked={isChecked? 'checked': ''}  /></td>
      <td><input type="checkbox" name="addon" id="addon" onChange={(e)=>toggleBox(e, 'addon')} checked={isAddOn? 'checked': ''}  /></td> 
      <td onClick={handleDelete}>delete</td>
  </tr>
  )
}

function ManageAccount() {

  const [ category, setCategory ] = useState('All Menu')
  const [ showMenu, setShowMenu ] = useState()
  const [cookies] = useCookies(['user'])
  const email = cookies.UserEmail

  const navigate = useNavigate()

  const fetchMenu = async()=>{
    try {
      const response = await axios.get('https://mymenuserver-xu2x.onrender.com/fetchmenu', {params: {email:email}})
      setCategory(response.data.fetchMenu)
    } catch (error) {
      console.log(error)
    }
  }

  const changeMenu =(type)=>{
    const newCart = category.menu.filter(item => item.foodCategories.includes(type))
    setShowMenu(newCart)
  }

  useEffect(()=>{
    fetchMenu()
  }, [])
  return (
    <>
        <NavBar />  
        <VNavigation />
        <div className="managemenu-container">
          <div className="heading">
            <h2>Manage Menu</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit dolor est rerum cupiditate ex, repellat sunt fugiat soluta pariatur. </p>
          </div>
          <div className="category-options">
            <ul>
              <li onClick={()=>changeMenu('Set Menu')}>Main Menu</li>
              <li onClick={()=>changeMenu("Side Menu")}>Side Menu</li>
              <li onClick={()=>changeMenu("Drinks")}>Drinks</li>
            </ul> 
            <button onClick={()=>navigate('/admin/menu')}> + </button>  
          </div>
          <div className="menu-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Today's Special</th>
                  <th>Coupon Addons</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {showMenu && <tbody>
                {showMenu && showMenu.map((items)=><ListItems items={items} key={items._id} email={email}/>) }
              </tbody>}
              { !showMenu && <tbody>
                {category.menu && category.menu.map((items)=><ListItems items={items} key={items._id} email={email} />) }
              </tbody>}
            </table>
          </div>
        </div>
    </>
  )
}

export default ManageAccount

