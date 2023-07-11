import React, { useEffect, useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './home.css';



function FilterBoxes() {
    const[categories, setCategories] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');
   const[selectedAuthor, setSelectedAuthor] = useState('')
   const [shouldNavigate, setShouldNavigate] = useState(false);
   const[books, setBooks] = useState([])
   const navigate = useNavigate();





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
  


    return(<>
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
    
    
    </>)
}

export default FilterBoxes