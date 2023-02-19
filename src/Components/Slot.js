import React, { useState, useContext } from 'react'
import question from '../icons/question.png'
import { SlotMachineContext } from '../App'
import { PopUp } from './functions'


function Slot() {

    const { icons, imgClassName, slotDiscount } = useContext(SlotMachineContext)
    const [ displayPopup, setDisplayPopup ] = useState(false)

    const handlePopUp=()=>{
        setDisplayPopup(!displayPopup)
    }

  return (
    <div className='slot'>
    <div className='slotMachine-container'>
        <div className="slotMachine-bar">
        </div>
        <div className="slotMachine-card">  
            <div className="slotMachine-row">
                <img src={icons[0].img} alt="icons" className={imgClassName} />
            </div>
            <div className="slotMachine-row">
                <img src={icons[1].img} alt="icons" className={imgClassName} />
            </div>
            <div className="slotMachine-row">
                <img src={icons[2].img} alt="icons" className={imgClassName} />
            </div>
        </div>
    </div>
    {!slotDiscount && <p>Win big discounts on all orders</p>}
    {slotDiscount && <p> You have won {slotDiscount}% discount on next order</p>}
    <img src={question} alt="What is the bar" className='slot-decription' onClick={handlePopUp} />
    {displayPopup && <PopUp handlePopUp ={handlePopUp} from='Slot' />}
    </div>
  )
}

export default Slot