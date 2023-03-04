import React, { useState } from 'react'
import AdminMenu from '../AdminMenu'
import MakeSetMealPack from '../../Components/MakeSetMealPack'

function AddMenu({items}) {

    // if(items) console.log(items)

    const [ showAddMenu, setShowAddMenu]= useState(true)
    const [ showAddAddOns, setShowAddAddOns] = useState()

    const changeWhatIsDisplayed =(whatToDisplay)=>{
        setShowAddAddOns(false)
        setShowAddMenu(false)
        whatToDisplay(true)
    }
  return (
    <>
    <h2>Edit Menu</h2>
    <p>Note:</p> <small className='message'> Before adding Set Menu, please note that AddOn menu should be created first from below 'Add AddOns' option, so that it can be added to set items when adding them to menu. </small>
        <div className="addmenu-navbar">
            <ul>
                <li onClick={()=>changeWhatIsDisplayed(setShowAddMenu)}>Add Menu</li>
                <li onClick={()=> changeWhatIsDisplayed(setShowAddAddOns) }>Add AddOns </li>
            </ul>
        </div>
        {showAddMenu && <AdminMenu items={items} />}
        {showAddAddOns && <MakeSetMealPack />}
    </>
  )
}

export default AddMenu