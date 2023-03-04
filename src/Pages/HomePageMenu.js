import React, { useEffect, useContext, useState } from 'react'
import FooterMenu from '../Components/FooterMenu';
import MainMenu from '../Components/MainMenu';
import Slot from '../Components/Slot';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import { FoodMenuContext, SlotMachineContext } from '../App'
import { useParams } from 'react-router-dom';
import ConfettiFunc from '../Components/Confetti';
import Dice from '../Components/Dice'

function HomePageMenu() {

  const { setFoodItems,  setSpecialItems, setAddOnMenu, setAddOnOptionsMenu} = useContext(FoodMenuContext)
  const { displayConfetti } = useContext(SlotMachineContext)
  const { name, id } = useParams()

  const fetchMenu = async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/`, {params: {email:name}})
      setFoodItems(response.data.fetchMenu)
      const specials = response.data.fetchMenu.menu.filter((item)=>item.todaySpecial === true)
      setSpecialItems(specials)
      const addOn = response.data.fetchMenu.menu.filter((item)=>item.isAddOn === true)
      setAddOnMenu(addOn)
      setAddOnOptionsMenu(response.data.fetchMenu.addonoptions)
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
        {/* <Dice /> */}
        <FooterMenu />
        <MainMenu />
    </>
  )
}

export default HomePageMenu