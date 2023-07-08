import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import {Card, Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import './home.css';

export const Home = () => {

    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }



const cardsData = [
    {
        id:1,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        title: "to kill a mocking bird",
        description: "justice exists in gray"

    },

    {
        id:2,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        title: "to kill a mocking bird",
        description: "justice exists in gray"


    },
    {
        id:3,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        title: "to kill a mocking bird",
        description: "justice exists in gray"


    },
    {
        id:4,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        title: "to kill a mocking bird",
        description: "justice exists in gray"


    }
]


  return (
    <div className="homepage">
      <Carousel indicators={true}>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Slide 1"
            />
            <div className="slide-content">
              <h1>Slide 1 Text</h1>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Slide 2"
            />
            <div className="slide-content">
              <h1>Slide 2 Text</h1>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/1478685/pexels-photo-1478685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Slide 3"
            />
            <div className="slide-content">
              <h1>Slide 3 Text</h1>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <Container className="input-container mt-4 mb-4">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={4}>
            <select>
              <option value="">Book Titles</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <select>
              <option value="">Book Genres</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <select>
              <option value="">Book Authors</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </Col>
        </Row>
      </Container>


      <section className="popular-books">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h2 className="text-center">Popular Books</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {cardsData.map((card, index) => (
              <Col key={index} xs={12} md={3} className="mt-3">
                <Card>
                  <Card.Img variant="top" src={card.imageUrl} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Row className="justify-content-center">
                    <div className="button-line">

                    <button className="custom-button">
  <IoMdInformationCircle className="info-icon" />
  Learn More
</button>


  <div className="line"></div>
  <button className="custom-button">
  <FaShoppingCart className="cart-icon" />
  Buy Now
</button>

  
</div>

                    </Row>
                  </Card.Body>
                </Card>
                
              </Col>
            ))}
          </Row>
        

        </Container>
      </section>

      <div className="image-section">
      <div className="overlay">
        <div className="content">
          <h1>Hey Reader!</h1>
          <p>Browse thru our entire collection of <a href='/'  className='btn btn-secondary curvy'>books </a></p>
        </div>
      </div>
    </div>
     


     
      
      
    </div>
  );
};

