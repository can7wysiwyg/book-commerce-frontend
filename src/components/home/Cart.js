import { getCart, removeItem } from "../../api/CartApi";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = getCart().map(item => ({ ...item, quantity: 1 }));
    setItems(cartItems);
  }, []);

  const incrementQuantity = (itemId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decrementQuantity = (itemId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    setItems(prevItems => prevItems.filter(item => item._id !== itemId));
    window.location.reload(); // Refresh the page after removing an item
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    // This function will be called when the checkout button is clicked
    // You can access the items and their quantities from the 'items' state
    // Perform any necessary operations (e.g., send data to a server, clear the cart, etc.)
    // You can customize the logic based on your specific requirements
  };

  if (items.length === 0) {
    return (
      <div style={{ margin: "2rem", fontFamily: "Times New Roman", fontStyle: "italic", textAlign: "center", color: "red" }}>
        <h1>Cart is empty!!</h1>
      </div>
    );
  }

  return (
    <>
      <div style={{ margin: "2rem", fontFamily: "Times New Roman", fontStyle: "italic", textAlign: "center" }}>
        <h1>My cart has {items.length} items</h1>
      </div>
      {
        items.map((item) => (
          <div key={item._id}>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card mb-4">
                  <img src={item.bookImage} alt={item.bookTitle} className="card-img-top" />
                  <div className="card-body">
                    <a href={`/book_single/${item._id}`} className="card-title">{item.bookTitle}</a>
                    <p className="card-title">{item.bookAuthor}</p>
                    <p className="card-text">MK {item.bookPrice}</p>
                    <div className="d-flex align-items-center mb-3">
                      <button className="btn btn-secondary" onClick={() => decrementQuantity(item._id)}>
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-secondary" onClick={() => incrementQuantity(item._id)}>
                        <FaPlus />
                      </button>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleRemoveItem(item._id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-primary" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
}

export default Cart;
