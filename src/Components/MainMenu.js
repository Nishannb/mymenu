import React, { useContext, useEffect, useState } from 'react'
import { FoodMenuContext, CartContext, SlotMachineContext } from '../App'
import logo from '../icons/logo.png'
import chilly from '../icons/chilly.png'
import greenTea from '../icons/green-tea.png'
import eggplant from '../icons/eggplant.png'
import badge from '../icons/badge.png'
import { ReturnQty, checkStorage, printResults, rollSlotMachine } from './functions'
import win from '../assests/win.wav'


export const ListItems =({items, changeIcons})=>{
    const { cartItems, setCartItems } = useContext(CartContext)
    const { icons, imgClassName, setImgClassName, setCountInterval, setDisplayConfetti, setSlotDiscount, slotDiscount} = useContext(SlotMachineContext);
    const [ buttonState, setButtonState ] = useState(false)


    const checkWinning =()=>{
        if(icons[0].name !== 'question' && icons[0].name === icons[1].name && icons[0].name === icons[2].name){
            setDisplayConfetti(true)
            const discount = printResults(icons)
            setSlotDiscount(discount)
            setTimeout(()=>{
                new Audio(win).play()
            }, 1000)
            setTimeout(() => {
                setDisplayConfetti(false)
            }, 3000);
        }
    }

    useEffect(()=>{
        if(imgClassName === 'notrolling') checkWinning()
    }, [icons, imgClassName])
    

    const addCart=(e, item)=>{
        e.preventDefault()
        
        setButtonState(true)
        const discount = rollSlotMachine(setImgClassName, changeIcons, setCountInterval, setButtonState, icons)
        if (discount === 0) setSlotDiscount()
        console.log(discount)

        const check = checkStorage(item)
        if(!check){
            setCartItems([{"itemName": item.itemName, "qty": 1, "price": item.price}])
            return localStorage.setItem("List", JSON.stringify([{"itemName": item.itemName, "qty": 1, "discount": discount, "price": item.price}]))  
        } 
        for (let listItem of check){
            if(listItem.itemName === item.itemName ){
               // Duplication of discount on same order --- fix this bug
                listItem.qty = listItem.qty + 1
                setCartItems(check)
                return localStorage.setItem("List", JSON.stringify(check))
            } 
        } 
        check.push({"itemName": item.itemName, "qty": 1, "discount": discount, "price": item.price})

        setCartItems(check)
        localStorage.setItem("List", JSON.stringify(check))
        return checkWinning()
    }  

    const removeCart=(e, item)=>{
        e.preventDefault()
        let check = checkStorage(item)
    
        if(!check) return 
        for (let listItem of check){
            listItem.discount = 0
            if(listItem.itemName === item && listItem.qty > 0 ){
                listItem.qty = listItem.qty - 1
                if (listItem.qty === 0){
                    check = check.filter((item)=>item.itemName !== listItem.itemName)
                }
                setCartItems(check)
                localStorage.setItem("List", JSON.stringify(check))
            }   
        }  
        return 
    }

    useEffect(()=>{
        const cartList = checkStorage()
        if(checkStorage) setCartItems(cartList) 
    },[])

    return (
        <div className="menu">
            <div className="food">
                <img src={items.itemImage[0].url} alt={items.itemName} />
                    <div className="food-description">
                        <p>{items.itemName}</p>
                        <small>{items.price} yen</small> <br/>
                        <small className='description'>{items.description}</small>
                    </div>
            </div>
            <div className="btns">
                <button disabled={buttonState} onClick={(e)=>removeCart(e,items.itemName)}>-</button>
                <small>{cartItems ? <ReturnQty key={items._id} cartItems = {cartItems} item={items.itemName} />:0 }</small>
                <button disabled={buttonState} onClick={(e)=>addCart(e,items)}>+</button>
            </div>
        </div>
    )
}

function MainMenu() {

    const { foodItems, showItems, specialItems  } = useContext(FoodMenuContext)
    const { setIcons, setCountInterval, countRef  } = useContext(SlotMachineContext);
    

    const allIcons = [
        {
            img: logo,
            name: 'star'
        }, 
        {
            img: chilly,
            name:'chilly'
        },
        {
            img: chilly,
            name:'chilly'
        },
        {
            img:eggplant,
            name: 'eggplant'
        },
        {
            img:greenTea,
            name: 'greenTea'
        }
    ]

    const changeIcons = () =>{
        setCountInterval((prevState)=> prevState + 1)
        if (countRef.current <10){
            const icon1 = allIcons[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
            const icon2 = allIcons[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
            const icon3 = allIcons[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
            let iconArray = [icon1, icon2, icon3]
            setIcons(iconArray)
            return 
        } 
    } 

  return (
    <div className='mainmenu-container'>
        <div className="menu-card">   
            { showItems &&  <div className="menu-items">
                { specialItems && specialItems.map((items)=><div key={items._id} className="wheel-card"> <div className="special"><h6>Todays Special</h6> <img className='badge' src={badge} alt='badge' /></div> <ListItems items={items} key={items._id} changeIcons={changeIcons} /></div>) }
                
                {showItems.map((items)=><ListItems items={items} key={items._id} changeIcons={changeIcons} />)}
            </div>}
            { !showItems && <div className="menu-items">
                { specialItems && specialItems.map((items)=><div key={items._id} className="wheel-card"> <div className="special"><h6>Todays Special</h6> <img className='badge' src={badge} alt='badge' /></div> <ListItems items={items} key={items._id} changeIcons={changeIcons} /></div>) }
                { foodItems.menu && foodItems.menu.map((items)=><ListItems items={items} key={items._id} changeIcons={changeIcons} />) }
            </div>}
        </div>
    </div>
  )
}


export default MainMenu 