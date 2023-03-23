import React, {useState, useEffect, useContext} from 'react'
import Message from './Message'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { RestaurantInfoContext } from '../Pages/Restaurants/AdminHomePage'

function Settings() {

    const [showSlotMachine, setShowSlotMachine] = useState()
    const [ showCouponSlider, setShowCouponSlider] = useState()
    const [ showReviewSystem, setShowReviewSystem] = useState()
    const [ showReviewQuestionForm, setShowReviewQuestionForm ] = useState()
    const [ questions, setQuestions ] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
    })

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const email = cookies.UserEmail

    const { restaurantInfo, setRestaurantInfo } = useContext(RestaurantInfoContext)


    const toggleBox=async(gameElement)=>{
        try {
            if(gameElement ==='slotMachine'){
                setShowSlotMachine(!showSlotMachine)
            } else if(gameElement === 'slider'){
                setShowCouponSlider(!showCouponSlider)
            } else if (gameElement === 'review'){
                setShowReviewSystem(!showReviewSystem)
            }
            console.log(`Going to change ${gameElement} status`)
          const response = await axios.post(`https://mymenuserver-xu2x.onrender.com/managegames`, {email:email, gameElement: gameElement})
        } catch (error) {
          console.log(error)
        }
      }

      const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`https://mymenuserver-xu2x.onrender.com/managegames`, {email:email, gameElement: 'review', questionList: questions })
            setShowReviewSystem(true)
            setShowReviewQuestionForm(false)
            setQuestions({
                question1: '',
                question2: '',
                question3: '',
                question4: '',
            })
        } catch (error) {
          console.log(error)
        }
      }

      const fetchRestaurantDetails = async ()=>{
        try {
            const response = await axios.get('https://mymenuserver-xu2x.onrender.com/fetchmenu', {params:{email:email}});
            setRestaurantInfo(response.data.fetchMenu)
            const slotMachineChecked = response.data.fetchMenu.isSlotMachineAdded
            const sliderChecked = response.data.fetchMenu.isCouponSliderAdded
            const reviewSystemChecked = response.data.fetchMenu.reviewInterface.isAdded
            setShowSlotMachine(slotMachineChecked)
            setShowCouponSlider(sliderChecked)
            setShowReviewSystem(reviewSystemChecked)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(restaurantInfo === 'All Menu'){
            fetchRestaurantDetails()
        } else {
            const slotMachineChecked = restaurantInfo.isSlotMachineAdded
            const sliderChecked = restaurantInfo.isCouponSliderAdded
            const reviewSystemChecked = restaurantInfo.reviewInterface.isAdded
            setShowSlotMachine(slotMachineChecked)
            setShowCouponSlider(sliderChecked)
            setShowReviewSystem(reviewSystemChecked)
        }
        
    }, [])

    const handleChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setQuestions((prevState)=>({
            ...prevState,
            [name]: value,
        }))
    }

    const forwardReviewSettings =()=>{
        if(showReviewSystem){
            toggleBox('review')
            return
        }
        setShowReviewQuestionForm(true)
        return
    }

  return (
    <>
    <Message />
        <h2>How you want to elevate your customer experience ?</h2>
        <p>Select all game elements you want to provide to your customers..</p>
        <div className="gamification-settings">
            <div className="games">
                <input type="checkbox" name="slotMachine" id="slotMachine" onChange={()=>toggleBox('slotMachine')} checked={showSlotMachine? 'checked': ''} />
                <label htmlFor="slotMachine">Slot Machine</label>
            </div>
            <div className="games">
                <input type="checkbox" name='slider' id='slider' onChange={()=>toggleBox('slider')} checked={showCouponSlider? 'checked': ''} />
                <label htmlFor="slider">Coupon Slider</label>
            </div>
            <div className="games">
                <input type="checkbox" name='review' id='review' onChange={()=>forwardReviewSettings()} checked={showReviewSystem? 'checked': ''} />
                <label htmlFor="review">Review System</label>
                {showReviewQuestionForm  && <div className="configure-review">
                    <p>Set 4 rating questions for customers to rate.</p>
                    <small>e.g. Rate our Cleanliness, what would you rate...</small>
                    <form onSubmit={handleSubmit }>
                        <input type="text" placeholder='Question 1' value={questions.question1} name='question1' id='question1' onChange={handleChange} required = { showReviewSystem? '': 'required' } />
                        <input type="text" placeholder='Question 2' value={questions.question2} name='question2' id='question2' onChange={handleChange} required = { showReviewSystem? '': 'required' }  />
                        <input type="text" placeholder='Question 3' value={questions.question3} name='question3' id='question3' onChange={handleChange} required = { showReviewSystem? '': 'required' }  />
                        <input type="text" placeholder='Question 4' value={questions.question4} name='question4' id='question4' onChange={handleChange} required = { showReviewSystem? '': 'required' }  />
                        <button>Submit</button>
                    </form>
                </div>}
            </div>
        </div>
    </>
  )
}

export default Settings