import { getCart } from "../../api/CartApi"
import {useState, useEffect} from "react"


function Cart() {

    const [items, setItems] = useState([]);
  

    useEffect(() => {
        setItems(getCart());
    }, []);



    

return(<>

<h1>my cart</h1>


</>)

}


export default Cart