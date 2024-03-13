import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoreCart, removeFromLS } from "../../Utilities/localstorage";
import Cart from "../cart/Cart";


const Bottles = () => {
    const [bottles , setBottles] = useState([])
    const [cart , setCart] = useState([])


    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])


    //  load cart from local storage 
    useEffect(() =>{
        console.log(bottles.length)
        if(bottles.length > 0) {
            const storeCart = getStoreCart();
            // console.log(storeCart , bottles);
            const saveCart = []
            for(const id of storeCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id)
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            console.log(saveCart)
            setCart(saveCart)
        }
    } , [bottles])


    const handleAddToCart = bottle => {
        const newCart = [...cart , bottle]
        setCart(newCart);
        addToLS(bottle.id)
    }


    const handleRemoveFromCart = id => {
        // from visual cart 
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        // from local storage
        removeFromLS(id);
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
           <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
          <div className="bottle-container"> 
          {
                bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart= {handleAddToCart}></Bottle>)
            }
          </div>
        </div>
    );
};

export default Bottles;