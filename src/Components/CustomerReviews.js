import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'



function EachReview ({review}){
    return (
    <div className='customer-reviews-card'>
        { review.reviewQuestion && review.reviewQuestion.map((question)=> <p key={question.question}>{question.question} <span>{question.rating} stars</span></p>) }
        <p className='review'>{review.reviewMsg}</p>  
    </div>
    )
}

function CustomerReviews() {

    const [customerReviews,setCustomerReviews ] = useState([])

    const [cookies] = useCookies(['user'])
    const email = cookies.UserEmail

    const fetchReviews = async()=>{
        try {
            const response = await axios.get('https://mymenuserver-xu2x.onrender.com/getreviews', {params:{email:email}} )
            setCustomerReviews(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchReviews()
    }, [])
  return (
    <>
        {customerReviews.map((review)=> <EachReview key={review._id} review={review} />) }
    </>
  )
}

export default CustomerReviews