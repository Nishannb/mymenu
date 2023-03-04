import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function MakeSetMealPack() {

    const [ optionName, setOptionName] = useState()
    const [itemName, setItemName] = useState({
        name: '',
        price: 0
    })
    const [cookie, setCookies, removeCookies] = useCookies(['user'])
    const email = cookie.UserEmail

    const saveItemName = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setItemName((prevState)=>({
            ...prevState,
            [name]: value,
        }))

    }

    useEffect(()=>{
        const storeItems = localStorage.getItem('itemStorage')
        if(!storeItems) localStorage.setItem('itemStorage', JSON.stringify([]))
    }, [])

    const saveInLocalStorage =(e)=>{
        e.preventDefault()
        const storage = JSON.parse(localStorage.getItem('itemStorage'))
        if(storage.length !== 0){
            for(let items of storage){
                if(itemName.name === items.name){
                    return 
                }
            }
        }
        storage.push(itemName)
        localStorage.setItem('itemStorage', JSON.stringify(storage))
        setItemName({
            name: '',
            price: 0
        })
    }

    const postOptionCollection = async(e)=>{
        e.preventDefault()
        try {
            const storage = JSON.parse(localStorage.getItem('itemStorage'))
            if(storage.length === 0) return
            if(itemName.name) storage.push(itemName)
            const response = await axios.post('http://localhost:8080/saveoptions', {email:email, optionName: optionName, optionItems: storage })
            localStorage.setItem('itemStorage', JSON.stringify([]))
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <div className="option-group-container">
            <div className="option-group-card">
                <h3>Create Set Menu Options</h3>
                <label htmlFor="addon-group">Name your set menu option: </label>
                <input type="text" placeholder='E.g Curry Options, Drinks Options' name='addon-group' onChange={(e)=>setOptionName(e.target.value)} />
                <div className="option-items">
                    <input type="text" placeholder='AddOn Name' name='name' value={itemName.name} onChange={(e)=>saveItemName(e)} />
                    <input type="number" placeholder='Price' value={itemName.price} name='price' onChange={(e)=>saveItemName(e)} />
                </div>
                <div className="btns">
                    <button className='save' onClick={saveInLocalStorage}>Save & Add More</button>
                    <button className='post' onClick={postOptionCollection}>Post Option</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default MakeSetMealPack