import React, { useEffect, useContext } from 'react'
import FooterMenu from '../Components/FooterMenu';
import MainMenu from '../Components/MainMenu';
import Slot from '../Components/Slot';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import { FoodMenuContext, SlotMachineContext } from '../App'
import { useParams } from 'react-router-dom';
import ConfettiFunc from '../Components/Confetti';

function HomePageMenu() {

  const { setFoodItems,  setSpecialItems, setAddOnMenu } = useContext(FoodMenuContext)
  const { displayConfetti } = useContext(SlotMachineContext)
  const { name, id } = useParams()

  const fetchMenu = async()=>{
    try {
      const response = await axios.get('https://mymenuserver-xu2x.onrender.com/', {params: {email:name}})
      setFoodItems(response.data.fetchMenu)
      const specials = response.data.fetchMenu.menu.filter((item)=>item.todaySpecial === true)
      setSpecialItems(specials)
      const addOn = response.data.fetchMenu.menu.filter((item)=>item.isAddOn === true)
      setAddOnMenu(addOn)
    } catch (error) {
      console.log(error)
    }
  }

  const saveParams =()=>{
      localStorage.setItem('myMenuParams', JSON.stringify(name))
      localStorage.setItem('myMenuTable', JSON.stringify(id))
  }

    useEffect(()=>{
        fetchMenu()
        saveParams()
    }, [])

  return (
    <>
        <NavBar navBarItem='Place Orders' />
        {displayConfetti && <ConfettiFunc />}
        <Slot />
        <FooterMenu />
        <MainMenu />
    </>
  )
}

export default HomePageMenu