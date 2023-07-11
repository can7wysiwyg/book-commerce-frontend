import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import "./newbooksingle.css"; 
import {  FaPlus } from 'react-icons/fa';
import FilterBoxes from "./FilterBoxes";

function NewBookSingle() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [booksByAuthor, setBooksByAuthor] = useState([]);


  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`/newbook/show_single/${id}`);
      setBook(res.data.data);
    };

    getBook();
  }, [id]);

  useEffect(() => {
    const getAuthorBooks = async () => {
      const res = await axios.get(`/book/show_authors_books/bk?bookAuthor=${book.bookAuthor}`);
      const allBooksByAuthor = res.data.data;
      const sortedBooksByAuthor = allBooksByAuthor.sort((a, b) => new Date(b.bookReleaseDate) - new Date(a.bookReleaseDate));
      const recentBooksByAuthor = sortedBooksByAuthor.slice(0, 4); // Get the first four items

      setBooksByAuthor(recentBooksByAuthor);
    };

    getAuthorBooks();
  }, [book.bookAuthor]);



  return (
    <>
     <div style={{marginBottom: "2rem", marginTop: "1rem"}}>
     <FilterBoxes />

     </div> 

    <div className="container d-flex justify-content-center align-items-center">
      <div className="product-details">
        <h3 className="product-title">{book.bookTitle} by {book.bookAuthor}</h3>
        <hr />
        <p className="product-description" style={{fontWeight: "bold"}}>{book.bookDescription}</p>
        <hr />
        <p className="product-release-date">Release Date: {moment(book.bookReleaseDate).format("MMM D YYYY")}</p>
        <hr />
        <img className="product-image" src={book.bookImage} alt={book.bookTitle} />
      </div>
      
      
    </div>
    <div>
        <h1 style={{ fontFamily: "Times New Roman", fontStyle: "italic" }}> Books By The Author</h1>
        <div className="row">
        {booksByAuthor.map((book) => (
            <div className="col-md-3" key={book._id}>
    <div className="card h-100" >

<img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
      <div className="card-body">
        <a href={`/book_single/${book._id}`} className="card-title">{book.bookTitle}</a>
        <p className="card-text">{book.bookPrice}</p>
        <button className="btn btn-primary">
          <FaPlus className="mr-1" />
          Add to Cart
        </button>
      </div>
      </div>
    </div>


        

        ))}




        </div>
        
    
      </div>

    </>
  );
}

export default NewBookSingle;
