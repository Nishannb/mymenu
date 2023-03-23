import React, { useState } from 'react'
import question from '../icons/question.png'
import { PopUp } from './functions'

function FoodMeter({level, reviewmeter}) {

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

    // Only used for review tracking
    if(reviewmeter === 0){
        spiceMeter = { width: '3vw', backgroundColor: '#7CFC00'}
    } else if(reviewmeter === 1){
        spiceMeter = { width: '20%' , backgroundColor: '#7CFC00'}
    } else if(reviewmeter === 2){
        spiceMeter = { width: '40%', backgroundColor: '#7CFC00'}
    } else if(reviewmeter === 3){
        spiceMeter = { width: '60%', backgroundColor: '#7CFC00'}
    } else if(reviewmeter === 4){
        spiceMeter = { width: '80%', backgroundColor: '#7CFC00'}
    }


  return (
    <>
        <div className='foodmeter-container'>
            <div className="meter-card">
                <div className="meter" style={spiceMeter}>
                    <p>{level}</p>
                </div>
            </div>
            {level && <img src={question} alt="What is the bar" onClick={handlePopUp} />}
        </div>
        {showPopUp && <PopUp handlePopUp ={handlePopUp} from='Spice' />}
    </>
  )
}

export default FoodMeter