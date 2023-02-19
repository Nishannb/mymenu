import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './Payments'


const PUBLIC_KEY = "pk_test_51M2HbeGxIj9gAPngQlvZOWOGz09sPkt1KwQDUkpn71HKrWvEMsJOhaUOQMeJMF0oKErsHQmwk1qtNP1Yuh3nAAau00jpGJTKNH"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <Payment />
    </Elements>
  )
}

export default StripeContainer