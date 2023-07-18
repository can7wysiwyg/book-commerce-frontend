import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"

function CartShow() {
   const location = useLocation()
   const state = useContext(GlobalState)
   const token = state.token
   const[items, setItems] = useState([])

   useEffect(() => {
const getCartItems = async() => {

    const res = await axios.get(`https://bookcommerce.onrender.com/cartt/show_cus_orders/fn?fullname=${location.state.itemName}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    setItems(res.data.data);

}

getCartItems()

   }, [location.state.itemName, token])


   
    
    return(<>
    
    
    </>)
}

export default CartShow