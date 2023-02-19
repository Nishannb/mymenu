import React from 'react'
import Confetti from 'react-confetti'

function ConfettiFunc() {
  return (
    <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        />
  )
}

export default ConfettiFunc