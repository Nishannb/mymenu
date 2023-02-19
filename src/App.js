import './App.css';
import { createContext, useState, useRef } from 'react'
import HomePageMenu from './Pages/HomePageMenu';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import DashBoard from './Pages/DashBoard';
import AdminMenu from './Pages/AdminMenu';
import ManageAccount from './Pages/ManageAccount';
import OrderCheckout from './Pages/OrderCheckout';
import question from './icons/question.png'
import GetQR from './Components/GetQR';
import Error from './Components/Error';
import Receipt from './Components/Receipt';

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
      <FoodMenuContext.Provider value={ { foodItems, setFoodItems, showItems, setShowItems, specialItems, setSpecialItems, addOnMenu, setAddOnMenu } }>
        <CartContext.Provider value={{cartItems, setCartItems}}>
          <SlotMachineContext.Provider value={{icons, setIcons, imgClassName, setImgClassName, countInterval, setCountInterval, countRef, displayConfetti, setDisplayConfetti, slotDiscount, setSlotDiscount }}>
          <BrowserRouter>
            <Routes>
              <Route path='/:name/:id' element={<HomePageMenu />} />
              <Route path='/checkout' element={<OrderCheckout />} />
              <Route path='/admin/login' element={<Login />} />
              <Route path='/admin/register' element={<Register />} />
              {AuthToken && UserEmail && <Route path='/admin/dashboard' element={<DashBoard />} />}
              {AuthToken && UserEmail && <Route path='/admin/menu' element={<AdminMenu />} />}
              {AuthToken && UserEmail && <Route path='/admin/manage' element={<ManageAccount />} />}
              {AuthToken && UserEmail && <Route path='/admin/getqr' element={<GetQR />} />}
              {AuthToken && UserEmail && <Route path='/admin/receipt' element={<Receipt />} />}
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
          </SlotMachineContext.Provider>
        </CartContext.Provider>
      </FoodMenuContext.Provider>
    </div>
  );
}

export default App;
