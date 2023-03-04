import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCookies } from 'react-cookie'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#666" },
			"::placeholder": { color: "#666" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function Payments() {
    const stripe = useStripe()
    const elements = useElements()
    const [cookies] = useCookies(['user'])
    const email = cookies.UserEmail

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('entered')
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            try{
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:8080/payments', {
                    amount: 4800,
                    id: id,
                    email: email
                })

                if(response.data.success){
                    console.log("successful payment")
                    let cardElement = elements.getElement(CardElement)
                    cardElement.clear()

                    // Send Success Message
                    window.location.reload()
                }
            } catch(error){
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    } 
  return (
    <>
        <form className='elements' onSubmit={handleSubmit}>
            <h2>Premium Payment</h2>
            <small>First 50: Only ¥4800 for 3 month subscription</small>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
    </>
  )
}

export default Payments