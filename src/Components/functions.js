import slotsound from '../assests/slot.mp3'
import chilly from '../icons/chilly.png'
import star from '../icons/logo.png'
import greentea from '../icons/green-tea.png'
import eggplant from '../icons/eggplant.png'

export const ReturnQty=({cartItems, item})=>{
    const QTY =()=>{
        let total = 0
        for(let items of cartItems){
            if(items.itemName === item){
                total+= items.qty
            }
        }
        return total
    } 
    return (
        QTY()
    )
}

export const checkStorage=()=>{
    const check = localStorage.getItem("List")
    if(!check) return false
    return JSON.parse(check)
}

export const printResults=(icons)=>{

    if(icons[0].name === 'question'){
        return 0
    }
    if(icons[0].name === icons[1].name && icons[0].name === icons[2].name){
        switch(icons[0].name){
            case 'eggplant':
                // console.log('5%')
                return 5;
            case 'chilly':
                // console.log('10%')
                return 10
            case 'star':
                // console.log('20%')
                return 20
            default:
                // console.log('5%')
                return 5
        }   
    }
    if(icons[0].name === icons[1].name || icons[2].name) {
        // console.log('0%')
        return 0
    }
    return 0
}

export const rollSlotMachine =(setImgClassName, changeIcons, setCountInterval, setButtonState, icons)=>{
    // new Audio(slotsound).play()
    setImgClassName('rolling')
    let intervalTime;
    
    setTimeout(() => {
        setImgClassName('notrolling')
        setButtonState(false)
        clearInterval(intervalTime)
        setCountInterval(0)
    }, 1200);

    intervalTime = setInterval(changeIcons, 120)
    return printResults(icons)
}

export const PopUp=({handlePopUp, from})=> {
    let msg;
    if(from === 'Spice'){
        msg = 'Please inform us how much spice do you want in your food.'
    } else {
        msg = `Get all chances to win Discounts on every order you place. Please note that all discounts will be invalid if any items from cart are taken out after discount recieved. Wish you all the luck!!!`
    }
    return (
      <div className="popup-card">
          <div className="popup">
              <div className="heading">
                  <h4>{from} Meter: </h4>
                  <h3 onClick={handlePopUp}>X</h3>
              </div>
              <small>{msg}</small>
              {from !== 'Spice' && <div className="slot-icons">
                <p>All <img src={star} alt='star' /> gets 20% Discount applied on next order</p>
                <p>All <img src={chilly} alt='chilly' /> gets 10% Discount applied on next order</p>
                <p>All <img src={greentea} alt='greentea'/>,<img src={eggplant} alt='eggplant'/> gets 5% Discount applied on next order</p>
              </div>}
          </div>        
      </div>
    )
  }