import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import star from '../icons/star.png'
import FoodMeter from './FoodMeter'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'


function SliderCard ({swiped, outOfFrame}){

    return (
        <TinderCard
            className="swipe" 
            key='{items._id}'
            onSwipe={(dir) => swiped(dir)} 
            onCardLeftScreen={()=> outOfFrame()}>
                <div style={{backgroundImage: `url(${star})`}} className='answer-card'>
                                
                </div>
                <small>Double tap for <br /> one star</small>
        </TinderCard>  
    )
}

function Review() {

    const question = [
        'Rate our Cleanliness',
        'Rate our Menu price',
        'Rate our Food Taste',
        'Rate our Services',
        'Please share experience with us'
    ]

    const [ questionNum, setQuestionNum]= useState(0)
    const [ displayTextArea, setDisplayTextArea] = useState(false)
    const [questions, setQuestions] = useState('')
    const [ answeredQuestion, setAnsweredQuestion] = useState([])
    const [ textAreaInput, setTextAreaInput] = useState('')

    const navigate = useNavigate()
    const { name } = useParams()    

    const swiped =(dir)=>{
        let star;
        if (dir === 'up'){
            star = 5
        } else if(dir === 'right'){
            star = 4
        } else if(dir === 'down'){
            star = 3
        } else {
            star = 2
        }

        const answers = [{question: questions[questionNum], rating: star}]
        answeredQuestion.filter((ans)=> answers.push(ans))

        setAnsweredQuestion(answers)

        if(questionNum === 3 ){
           setDisplayTextArea(true)
        };
        setQuestionNum(()=>questionNum + 1) 
    }
    const outOfFrame =()=>{
        // console.log('outofframe')
        return
    }

    const fetchReviewQuestion = async()=>{
        try {
            const response = await axios.get('https://mymenuserver-xu2x.onrender.com/reviews', {params:{email:name}})
            setQuestions(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchReviewQuestion()
    }, [])

    const handleSubmit = async(e)=>{ 
        e.preventDefault()
        if(textAreaInput === '') return
        try {
            const response = await axios.post('https://mymenuserver-xu2x.onrender.com/reviews', { email:name, textAreaInput: textAreaInput, answeredQuestion: answeredQuestion})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange =(e)=>{
        setTextAreaInput(e.target.value)
    }

  return (
    <>
    <NavBar />
    <FoodMeter reviewmeter={questionNum} />
        <div className='review-container'>
        <div className="review-card">
            <div className="question-card">
                <p>Review {questionNum + 1}</p>
                {!displayTextArea && <h3>{questions[questionNum]}</h3>}
                {displayTextArea && <h3>Please share your experience with us..</h3>}
                <small>スワイプして回答</small>
            </div>
            
            {!displayTextArea && <div className="answer-container">
                <h4 className='x2'>2x</h4>
                <h4 className='x3'>3x</h4>
                
                <h4 className='x5'>5x</h4>
                <div className="answer-slider">
                   { [1,2,3,4].map((num)=><SliderCard key={num} swiped={swiped} outOfFrame ={outOfFrame}/>)}
                       
                </div>
                <h4 className='x4'>4x</h4>
            </div>}
            { displayTextArea && <div className='input-section'>
                <textarea name="description" id="description" placeholder='Please share your review with us' cols="40" rows="5" onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div> }
            
        </div>
    </div>
    </>
  )
}

export default Review