import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import {Card, Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import './home.css';
import { useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import Img1 from "./images/img1.jpg"
import Img2 from "./images/img2.jpg"
import Img3 from "./images/img3.jpg"


export const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const[categories, setCategories] = useState([])
    const[cardsData, setCardsData] = useState([])
   const [selectedOption, setSelectedOption] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');
   const[selectedAuthor, setSelectedAuthor] = useState('')
   const [shouldNavigate, setShouldNavigate] = useState(false);
   const[books, setBooks] = useState([])

   const navigate = useNavigate();






   useEffect(() => {

    const getCards = async() => {

      const res = await axios.get('/book/popular')
      setCardsData(res.data.results)

    }

    getCards()


   }, [])


  useEffect(() => {

    const getBooks = async() => {

      const res = await axios.get('/book/show_all')

      setBooks(res.data.data)


    }

    getBooks()



  }, [])


   
 
   const handleChange = (event) => {
     const selectedValue = event.target.value;
     setSelectedOption(selectedValue);
     setShouldNavigate(true);
   };
 
   useEffect(() => {
     if (shouldNavigate) {
      
       navigate('/by_price', { state: selectedOption });
       setShouldNavigate(false);
     }
   }, [shouldNavigate, selectedOption, navigate]);
 
   
useEffect(() => {

  const getCategories = async() => {

    const getCats = async() => {
      const res = await axios.get("/genre/show_all")

      setCategories(res.data.data)

  }

  getCats()




  }

  getCategories()


}, [])




  
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





const handleCategoryChange = (event) => {
  const categoryId = event.target.value;
  setSelectedCategory(categoryId);
  if (categoryId) {
    navigate(`/category/${categoryId}`);
  }
};


const handleAuthorChange = (event) => {
  const authorName = event.target.value
  setSelectedAuthor(authorName)
  if(authorName) {
    navigate('/author_books',  { state: authorName} )
  }
}


const handleRedirect = async() => {
 window.location.href = "/books"

}





  return (
    <div className="homepage">
      <Carousel indicators={true}>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src={Img1}
              alt="Slide 1"
            />
            <div className="slide-content">
              <h1>Books are life! Read books and...</h1>
              <Button variant="secondary" onClick={handleRedirect}>Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src={Img2}
              alt="Slide 2"
            />
            <div className="slide-content">
              <h1>Expand your knowledge, broaden your horizons,</h1>
              <Button variant="secondary" onClick={handleRedirect}>Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide-container">
            <img
              className="d-block w-100"
              src={Img3}
              alt="Slide 3"
            />
            <div className="slide-content">
              <h1>and embark on new adventures through the pages of books.</h1>
              <Button variant="secondary" onClick={handleRedirect}>Learn More</Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>


      
      <Container className="input-container mt-4 mb-4">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={4}>
          <select value={selectedOption} onChange={handleChange}>
        <option value="">Book Prices</option>
        <option value="lowest-medium">Lowest-Medium</option>
        <option value="medium">Medium</option>
        <option value="medium-highest">Medium-Highest</option>
      </select>


         
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
          <select value={selectedCategory} onChange={handleCategoryChange}>
      <option value="">Book Genres</option>
      {categories?.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      ))}
    </select>
            
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <select value={selectedAuthor} onChange={handleAuthorChange}>
              <option value="">Book Authors</option>
              {
                books?.map((book) => (
                  <option key={book._id}>{book.bookAuthor} </option>
                ))

              }
             
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
                  <Card.Img variant="top" src={card.bookImage} />
                  <Card.Body>
                    <Card.Title>{card.bookTitle}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Row className="justify-content-center">
                    <div className="button-line">

                    <button className="custom-button">
  <IoMdInformationCircle className="info-icon" />
  Learn More
</button>


  <div className="line"></div>
  <button className="custom-button" onClick={() => {
    window.location.href = `/book_single/${card._id}`
  }}>
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
          <p>Browse thru our entire collection of <a href='/search_books'  className='btn btn-secondary curvy'>books </a></p>
        </div>
      </div>
    </div>
     


     
      
      
    </div>
  );
};


