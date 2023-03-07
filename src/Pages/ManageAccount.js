import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ItemSelectedToEdit } from './Restaurants/AdminHomePage';

function ListItems({items, email}){

  const [ isChecked, setIsChecked ] = useState('')
  const [ isAddOn, setIsAddOn ] = useState('')
  const { setEditThisItem, setShowMenuEditInterface } = useContext(ItemSelectedToEdit)

  const navigate = useNavigate()

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
    // Delete all ifs 
    if(items.todaySpecial) setIsChecked(true)
    if(items?.isAddOn) setIsAddOn(true)
  }, [])

  const turnOnEditMenuDisplayAndPopulate=()=>{
    setShowMenuEditInterface(true)
    setEditThisItem(items)
  }


  return(
    <tr onClick={turnOnEditMenuDisplayAndPopulate}>
      <td><img src={items.itemImage[0].url} alt={items.itemName} /></td>
      <td>{items.itemName}</td>
      <td>{items.price}</td>
      <td><input type="checkbox" name="special" id="special" onChange={(e)=>toggleBox(e, 'specials')} checked={isChecked? 'checked': ''}  /></td>
      <td><input type="checkbox" name="addon" id="addon" onChange={(e)=>toggleBox(e, 'addon')} checked={isAddOn? 'checked': ''}  /></td> 
  </tr>
  )
}

function ManageAccount() {

  const [ category, setCategory ] = useState('All Menu')
  const [ showMenu, setShowMenu ] = useState()
  const [cookies] = useCookies(['user'])
  const email = cookies.UserEmail
  const { setShowMenuEditInterface } = useContext(ItemSelectedToEdit)


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
    if(!type) return setShowMenu()
    const newCart = category.menu.filter(item => item.foodCategories.includes(type))
    setShowMenu(newCart)
  }

  useEffect(()=>{
    fetchMenu()
  }, [])
  return (
    <>
        <div className="managemenu-container">
          <div className="heading">
            <h2>Manage Menu</h2>
            <p>From this Menu, you can change your menu such as changing today's special dish, adding items that can be included in coupons and set up items that are included in Set Meals that you offer. </p>
          </div>
          <div className="category-options">
            <ul>
              <li onClick={()=>changeMenu('')}>Main Menu</li>
              <li onClick={()=>changeMenu("Side Menu")}>Side Menu</li>
              <li onClick={()=>changeMenu("Drinks")}>Drinks</li>
            </ul> 
            <button onClick={()=>setShowMenuEditInterface(true)}> + </button>  
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

