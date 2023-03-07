import React, { useEffect, useState } from 'react'
import axios from 'axios'

function MakeDice(){
    return(
        <div className='dice-container'>
            <div className="cube">
                <div className="front">
                    <span className='dot dot1'></span>
                </div>
                <div className="back">
                    <span className='dot dot1'></span>
                    <span className='dot dot2'></span>
                </div>
                <div className="right">
                    <span className='dot dot1'></span>
                    <span className='dot dot2'></span>
                    <span className='dot dot3'></span>
                </div>
                <div className="left">
                    <span className='dot dot1'></span>
                    <span className='dot dot2'></span>
                    <span className='dot dot3'></span>
                    <span className='dot dot4'></span>
                </div>
                <div className="top">
                    <span className='dot dot1'></span>
                    <span className='dot dot2'></span>
                    <span className='dot dot3'></span>
                    <span className='dot dot4'></span>
                    <span className='dot dot5'></span>
                </div>
                <div className="bottom">
                    <span className='dot dot1'></span>
                    <span className='dot dot2'></span>
                    <span className='dot dot3'></span>
                    <span className='dot dot4'></span>
                    <span className='dot dot5'></span>
                    <span className='dot dot6'></span>
                </div>
        </div>
        
    </div>
    )
}

function Dice() {

    const fetchMenu = async()=>{
        try {
          const response = await axios.get('https://mymenuserver-xu2x.onrender.com/', {params: {email:"everest@gmail.com"}})
          console.log(response.data.fetchMenu.menu)
        } catch (error) {
          console.log(error)
        }
      }
  
      useEffect(()=>{
        fetchMenu()
      }, [])

  return (
    <>
    <div className="dice-menu-items">
    {/* <p>Roll dice to get your personalized Happy hour</p> */}
        { [1,2,3].map((i)=><MakeDice key={i} />) }
        {/* <small>Roll dice to get your personalized Happy hour</small> */}
    </div>
    </>
  )
}

export default Dice