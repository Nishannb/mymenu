import './App.css';
import { createContext, useState, useRef } from 'react'
import HomePageMenu from './Pages/HomePageMenu';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import OrderCheckout from './Pages/OrderCheckout';
import question from './icons/question.png'
import Error from './Components/Error';
import HomePage from './Pages/HomePage';
import Footer from './Components/Footer';
import AdminHomePage from './Pages/Restaurants/AdminHomePage';

export const FoodMenuContext = createContext({})
export const CartContext = createContext({})
export const SlotMachineContext = createContext({})

function App() {

  const [ foodItems, setFoodItems ] = useState([])
  const [ showItems, setShowItems ] = useState("")
  const [ specialItems, setSpecialItems ] = useState("")
  const [ addOnMenu, setAddOnMenu ] = useState("")
  const [ cookies ] = useCookies(['user'])
  const [ cartItems, setCartItems ] = useState([])
  const [ addOnOptionsMenu, setAddOnOptionsMenu ] = useState([])
  const [ blurBackground, setBlurBackground] = useState(false)

  // Slot Machine States //
  const [ imgClassName, setImgClassName ] = useState('notrolling')
  const countRef = useRef(null)
  const [ countInterval, setCountInterval ] = useState(0)
  countRef.current = countInterval;
  const [ icons, setIcons ]= useState([
    {
        img: question,
        name: 'question'
    },
    {
        img: question,
        name: 'question'
    },{
        img: question,
        name: 'question'
    }
  ])
  const [displayConfetti, setDisplayConfetti ] = useState(false)
  const [ slotDiscount, setSlotDiscount] = useState()
  // Slot Machine States //

  const AuthToken = cookies.AuthToken
  const UserEmail = cookies.UserEmail

  return (
    <div className="App">
      <FoodMenuContext.Provider value={ { foodItems, setFoodItems, addOnOptionsMenu, setAddOnOptionsMenu, showItems, setShowItems, specialItems, setSpecialItems, addOnMenu, setAddOnMenu, blurBackground, setBlurBackground } }>
        <CartContext.Provider value={{cartItems, setCartItems}}>
          <SlotMachineContext.Provider value={{icons, setIcons, imgClassName, setImgClassName, countInterval, setCountInterval, countRef, displayConfetti, setDisplayConfetti, slotDiscount, setSlotDiscount }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/:name/:id' element={<HomePageMenu />} />
              <Route path='/checkout' element={<OrderCheckout />} />
              <Route path='/admin/login' element={<Login />} />
              <Route path='/admin/register' element={<Register />} />
              {AuthToken && UserEmail && <Route path='/admin/manage' element={<AdminHomePage />} />}
              <Route path='*' element={<Error />} />
              <Route path='/admin/*' element={<Error />} />
            </Routes>
          </BrowserRouter>
          </SlotMachineContext.Provider>
        </CartContext.Provider>
      </FoodMenuContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
