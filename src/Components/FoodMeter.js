import React, { useState } from 'react'
import question from '../icons/question.png'
import { PopUp } from './functions'

function FoodMeter({level}) {

    const [ showPopUp, setShowPopUp ] = useState(false)
    const handlePopUp=(e)=>{
        setShowPopUp(!showPopUp)
    }
    let spiceMeter;
    if(level === 'Medium'){
        spiceMeter = { width: '60vw'}
    } else if( level === 'Hot'){
        spiceMeter = { width: '100vw'}
    }
  return (
    <>
        <div className='foodmeter-container'>
            <div className="meter-card">
                <div className="meter" style={spiceMeter}>
                    <p>{level}</p>
                </div>
            </div>
            <img src={question} alt="What is the bar" onClick={handlePopUp} />
        </div>
        {showPopUp && <PopUp handlePopUp ={handlePopUp} from='Spice' />}
    </>
  )
}

export default FoodMeter