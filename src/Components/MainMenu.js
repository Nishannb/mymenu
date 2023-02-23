import React, { useContext, useEffect, useState } from 'react'
import { FoodMenuContext, CartContext, SlotMachineContext } from '../App'
import logo from '../icons/logo.png'
import chilly from '../icons/chilly.png'
import greenTea from '../icons/green-tea.png'
import eggplant from '../icons/eggplant.png'
import badge from '../icons/badge.png'
import { ReturnQty, checkStorage, printResults, rollSlotMachine } from './functions'
import ping from '../assests/ping.mp3'


export const ListItems =({items, changeIcons})=>{
    const { cartItems, setCartItems } = useContext(CartContext)
    const { addOnOptionsMenu} = useContext(FoodMenuContext)
    const { icons, imgClassName, setImgClassName, setCountInterval, setDisplayConfetti, setSlotDiscount} = useContext(SlotMachineContext);
    const [ buttonState, setButtonState ] = useState(false)
    const [ displayAddOnPopUp, setDisplayAddOnPopUp] = useState(false)
    const [addOnListForDisplayingPopup, setAddOnListForDisplayingPopup] = useState([])
    const [ selectedOptionsRemarks, setSelectedOptionsRemarks] = useState([])

    const checkWinning =()=>{
        if(icons[0].name !== 'question' && icons[0].name === icons[1].name && icons[0].name === icons[2].name){
            setDisplayConfetti(true)
            const discount = printResults(icons)
            setSlotDiscount(discount)
            new Audio(ping).play()
            setTimeout(() => {
                setDisplayConfetti(false)
            }, 5000);
        }
    }

    useEffect(()=>{
        if(imgClassName === 'notrolling') checkWinning()
    }, [icons, imgClassName])
    

    const addCart=(e, item)=>{
        e.preventDefault()
        let remarks= 'no remarks';
        let addOnprice = 0
        if(displayAddOnPopUp){   
            remarks = Object.keys(selectedOptionsRemarks)
            remarks.map((opt)=> selectedOptionsRemarks.opt ? addOnprice += selectedOptionsRemarks.opt.price: addOnprice += 0)
            remarks = JSON.stringify(remarks)
            if(remarks==='[]') return setDisplayAddOnPopUp(true)
            setDisplayAddOnPopUp(false)
            setAddOnListForDisplayingPopup([])
            setSelectedOptionsRemarks([])
        }
        setButtonState(true)
        const discount = rollSlotMachine(setImgClassName, changeIcons, setCountInterval, setButtonState, icons)
        if (discount === 0) setSlotDiscount()

        const check = checkStorage(item)
        if(!check){
            setCartItems([{"itemName": item.itemName, "qty": 1, "price": (item.price + addOnprice)}])
            return localStorage.setItem("List", JSON.stringify([{"itemName": item.itemName, "qty": 1, "discount": discount, "price": (item.price + addOnprice), "remarks": remarks}]))  
        } 
        for (let listItem of check){
            if(listItem.itemName === item.itemName && listItem.remarks === remarks ){
               // Duplication of discount on same order --- fix this bug
                listItem.qty = listItem.qty + 1
                setCartItems(check)
                return localStorage.setItem("List", JSON.stringify(check))
            } 
        } 
        check.push({"itemName": item.itemName, "qty": 1, "discount": discount, "price": (item.price + addOnprice), "remarks": remarks})

        setCartItems(check)
        localStorage.setItem("List", JSON.stringify(check))
        return checkWinning()
    }  

    const removeCart=(e, item)=>{
        e.preventDefault()
        setAddOnListForDisplayingPopup([])
        let check = checkStorage(item.itemName)
    
        if(!check) return 
        for (let listItem of check){
            let changed = false
            listItem.discount = 0
            if(listItem.itemName === item.itemName && listItem.qty > 0 ){
                console.log(listItem.itemName, listItem.remarks)
                listItem.qty = listItem.qty - 1
                if (listItem.qty === 0){
                    console.log(listItem.remarks)
                    if(listItem.remarks !== 'no remarks'){
                        check = check.filter((item)=>item.remarks !== listItem.remarks)
                        setCartItems(check)
                        return localStorage.setItem("List", JSON.stringify(check))
                    }
                    check = check.filter((item)=>item.itemName !== listItem.itemName)
                }
                setCartItems(check)
                localStorage.setItem("List", JSON.stringify(check))
                changed = true
            }      
            
            if (changed) return
        }  
        return 
    }

    const askForOptions=(e, item)=>{
        setDisplayAddOnPopUp(true)
        for(let options of item.hasSetMenu){
            const optionchoice = addOnOptionsMenu.filter((addOn)=> addOn.optionName === options)
                setAddOnListForDisplayingPopup((prevState)=>[...prevState,{
                    optionName: options,
                    optionItems: optionchoice 
                }])
        }
    }
    useEffect(()=>{
        const cartList = checkStorage()
        if(checkStorage) setCartItems(cartList) 
    },[])

    const undoPopup =()=>{
        setDisplayAddOnPopUp(false)
        setAddOnListForDisplayingPopup([])
    }

    const handleAddOnOptions = (e)=>{
        const inputValue = JSON.parse(e.target.value)
        if(selectedOptionsRemarks.hasOwnProperty(inputValue.optname)) {
            return setSelectedOptionsRemarks((prevState)=> Object.fromEntries(Object.entries(prevState).filter(itemOption => itemOption[0] != inputValue.optname)))
        } 
        setSelectedOptionsRemarks((prevState)=> ({
            ...prevState,
            [inputValue.optname]: inputValue
        }))
    }

    return (
        <div className="menu" >
            <div className="food">
                <img src={items.itemImage[0].url} alt={items.itemName} />
                    <div className="food-description">
                        <p>{items.itemName}</p>
                        <small>{items.price} yen</small> <br/>
                        <small className='description'>{items.description}</small>
                    </div>
            </div>
            <div className="btns">
                <button disabled={buttonState} onClick={(e)=>removeCart(e,items)}>-</button>
                <small>{cartItems ? <ReturnQty key={items._id} cartItems = {cartItems} item={items.itemName} />:0 }</small>
                {!items.hasSetMenu[0] && <button disabled={buttonState} onClick={(e)=>addCart(e,items)}>+</button>}
                {items.hasSetMenu[0] && <button disabled={buttonState} onClick={(e)=>askForOptions(e,items)}>+</button>}
            </div>
            {displayAddOnPopUp && <div className={`addon-container`}>
                    {items.hasSetMenu[0] && <div className="addon-card">
                        <h4>{items.itemName} </h4>
                        <p>{items.description}</p>
                        <p>Please Select options for your {items.itemName} Set Meal.</p>
                        {addOnListForDisplayingPopup && addOnListForDisplayingPopup.map((addOnItems)=> <div className='options-section-card' key={addOnItems.optionName}>
                            <h3>Please Select from {addOnItems.optionName}</h3>
                            { addOnItems.optionItems[0].optionItems.map((items)=> <fieldset key={items._id}>
                                    <input type='checkbox' id={items.name} value={JSON.stringify({optname: items.name, price: items.price})} onClick={handleAddOnOptions} />
                                    <label htmlFor={items.name}>{items.name}</label>
                                    <p>{items.price} yen</p>
                                </fieldset>) }
                        </div>)}
                    </div>  }
                    <div className="btn">
                        <button className='cancel' onClick={undoPopup}>Cancel</button>
                        <button className='save' onClick={(e)=> addCart(e, items)}>Add to cart</button>
                    </div>
            </div>}
        </div>
    )
}

function MainMenu() {

    const { foodItems, showItems, specialItems} = useContext(FoodMenuContext)
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
        },
        {
            img:greenTea,
            name: 'greenTea'
        },
        {
            img:greenTea,
            name: 'greenTea'
        },
        {
            img:greenTea,
            name: 'greenTea'
        }
    ]

    const changeIcons = () =>{
        setCountInterval((prevState)=> prevState + 1)
        if (countRef.current <10){
            const icon1 = allIcons[Math.floor(Math.random() * (9 - 0 + 1)) + 0]
            const icon2 = allIcons[Math.floor(Math.random() * (9 - 0 + 1)) + 0]
            const icon3 = allIcons[Math.floor(Math.random() * (9 - 0 + 1)) + 0]
            let iconArray = [icon1, icon2, icon3]
            setIcons(iconArray)
            return 
        } 
    } 

  return (
    <div className='mainmenu-container'>
        <div className="menu-card">  
            { showItems &&  <div className="menu-items" >
                { specialItems && specialItems.map((items)=><div key={items._id} className="wheel-card"> <div className="special"><h6>Todays Special</h6> <img className='badge' src={badge} alt='badge' /></div> <ListItems items={items} key={items._id} changeIcons={changeIcons} /></div>) }
                
                {showItems.map((items)=><ListItems items={items} key={items._id} changeIcons={changeIcons} />)}
            </div>}
            { !showItems && <div className="menu-items" >
                { specialItems && specialItems.map((items)=><div key={items._id} className="wheel-card"> <div className="special"><h6>Todays Special</h6> <img className='badge' src={badge} alt='badge' /></div> <ListItems items={items} key={items._id} changeIcons={changeIcons} /></div>) }
                { foodItems.menu && foodItems.menu.map((items)=><ListItems items={items} key={items._id} changeIcons={changeIcons} />) }
            </div>}
        </div>
    </div>
  )
}


export default MainMenu 