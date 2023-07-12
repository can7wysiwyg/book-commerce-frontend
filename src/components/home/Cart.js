import { getCart } from "../../api/CartApi"
import {useState, useEffect} from "react"
import { FaPlus, FaMinus } from 'react-icons/fa';




function Cart() {

    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
  

    useEffect(() => {
        setItems(getCart());
    }, []);


    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1);
        }
      };
    
if(items.length === 0)  {

    return(<>
    
    <div style={{margin: "2rem", fontFamily: "Times New Roman", fontStyle: "italic", textAlign: "center", color: "red"}}>
<h1> cart is empty!!  </h1>
</div>

    
    </>)
}   
    

return(<>
<div style={{margin: "2rem", fontFamily: "Times New Roman", fontStyle: "italic", textAlign: "center"}}>
<h1> my cart has {items.length} items </h1>
</div>
{
    items?.map((item) => (
        <div key={item._id}>
            <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4">
              <img src={item.bookImage} alt={item.bookTitle} className="card-img-top" />
              <div className="card-body">
                <a href={`/book_single/${item._id}`} className="card-title">{item.bookTitle}</a>
                        <p className="card-title " >{item.bookAuthor}</p>
                <p className="card-text">MK {item.bookPrice}</p>
                <div className="d-flex align-items-center mb-3">
                  <button className="btn btn-secondary" onClick={decrementQuantity}>
                    <FaMinus />
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button className="btn btn-secondary" onClick={incrementQuantity}>
                    <FaPlus />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div> 
        



        </div>
    ))
}


</>)

}


export default Cart