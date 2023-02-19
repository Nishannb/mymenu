import React, { useContext } from 'react'
import drink from '../icons/drinkset.png'
import main from "../icons/meal.png"
import { FoodMenuContext } from '../App'
import curry from '../icons/curry.png'

function FooterMenu() {

    const { foodItems, setShowItems } = useContext(FoodMenuContext)

    const handleClick =(e, type)=>{
        if(!type) return setShowItems('')
        const newCart = foodItems.menu.filter(item => item.foodCategories.includes(type))
        setShowItems(newCart)
    }

  return (
    <div className='footermenu-container'>
        <div className="footer-buttons">
            <div className="btn" onClick={(e)=>handleClick(e, "")}>
                <img src={main} alt="food btn" />
                <small>All Menu</small>
            </div>
            <div className="btn" onClick={(e)=>handleClick(e, "Side Menu")}>
                <img src={curry} alt="sidedish btn" />
                <small>Side Menu</small>
            </div>
            <div className="btn" onClick={(e)=>handleClick(e, "Drinks")}>
                <img src={drink} alt="drinks btn" />
                <small>Drinks</small>
            </div>
        </div>
    </div>
  )
}

export default FooterMenu