import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { Card, Carousel, Container, Row, Col } from "react-bootstrap";
import "./home.css";
import axios from "axios";
import Img1 from "./images/img1.jpg";
import Img2 from "./images/img2.jpg";
import Img3 from "./images/img3.jpg";
import FilterBoxes from "./FilterBoxes";
import { addItem } from "../../api/CartApi";

const Loader = () => {
  return (
    <div className="loading">
    <div className="loader"></div>
  </div>
      );
};

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await axios.get(
          'https://bookcommerce.onrender.com/book/popular'
        );
        setCardsData(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false); // In case of an error, still stop the loading state
      }
    };

    getCards();
  }, []);

  
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/cart");
    }
  };

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

  
  return (
    <>
      {shouldRedirect(redirect)}
      <div className="homepage">
      <Carousel indicators={false}>
  <Carousel.Item>
    <div className="slide-container">
      <img className="d-block w-100" src={Img1} alt="Slide 1" />
      <div className="slide-content"></div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div className="slide-container">
      <img className="d-block w-100" src={Img2} alt="Slide 2" />
      <div className="slide-content"></div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div className="slide-container">
      <img className="d-block w-100" src={Img3} alt="Slide 3" />
      <div className="slide-content"></div>
    </div>
  </Carousel.Item>
</Carousel>

        
        <Container className="input-container mt-4 mb-4">
          <FilterBoxes />
        </Container>

        <section className="popular-books">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12}>
                <h2 className="text-center">Popular Books</h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        cardsData.map((card, index) => (
          <Col key={index} xs={12} md={3} className="mt-3">
            <Card>
              <Card.Img variant="top" src={card.bookImage} />
              <Card.Body>
                <Card.Title>{card.bookTitle}</Card.Title>
                <Card.Title>{card.bookAuthor}</Card.Title>
                <Row className="justify-content-center">
                  <div className="button-line">
                    <button
                      className="custom-button"
                      onClick={() => {
                        window.location.href = `/book_single/${card._id}`;
                      }}
                    >
                      <IoMdInformationCircle className="info-icon" />
                      Learn More
                    </button>

                    <div className="line"></div>
                    <button
                      className="custom-button"
                      onClick={() => {
                        addItem(card, () => {
                          setRedirect(true);
                        });
                      }}
                    >
                      <FaShoppingCart className="cart-icon" />
                      Buy Now
                    </button>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>



                      </Container>
        </section>

        <div className="image-section">
          <div className="overlay">
            <div className="content">
              <h1>Hey Reader!</h1>
              <p>
                Browse through our entire collection of&nbsp;
                <a
                  href="/search_books"
                  className="btn btn-primary rounded-pill curvy"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  Books
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
