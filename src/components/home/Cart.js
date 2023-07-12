import { getCart, removeItem, emptyCart } from "../../api/CartApi";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Modal, Button, Container, Form, Col, Row } from 'react-bootstrap';

function Cart() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    email: "",
    fullname: "",
    phonenumber: "",
    address: ""
  });

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
  };

  const handleEmptyCart = () => {
    emptyCart(() => {
      setItems([]);
    });
    window.location.reload(); // Refresh the page after emptying the cart
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const cartData = items.map(item => ({
      ...item,
      quantity: item.quantity,
    }));
    const orderData = {
      userDetails: values,
      cartContents: cartData,
    };
    // Send the orderData to the server
    console.log(orderData);

    // Perform necessary operations with the form data
    // Close the modal after form submission or perform any other desired actions
    setShowModal(false);
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
      <div style={{ textAlign: "center", margin: "2rem" }}>
        <button className="btn btn-danger" onClick={handleEmptyCart} style={{ marginRight: "3rem" }}>
          Empty Cart
        </button>
        <Button className="btn btn-primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <p>Write Your Details To Place Your Order</p>
            <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleInputChange}
                      placeholder="Your fullname"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Control
                      type="number"
                      name="phonenumber"
                      value={values.phonenumber}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Control
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                      placeholder="Your area of residence"
                      required
                    />
                  </Form.Group>

                  <Button variant="danger" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cart;
