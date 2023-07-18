import { useLocation } from "react-router-dom";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterBoxes from "./FilterBoxes";
import { addItem } from "../../api/CartApi";


function AuthorBooks() {
  const location = useLocation();
  const authorName = location.state;
  const [books, setBooks] = useState([]);
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/cart");
    }
  };




  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("https://bookcommerce.onrender.com/book/show_all");
      setBooks(res.data.data);
    };

    getBooks();
  }, []);

  useEffect(() => {
    const getAuthorBooks = async () => {
      const res = await axios.get(`https://bookcommerce.onrender.com/newbook/show_authors_books/bk?bookAuthor=${authorName}`);
      const allBooksByAuthor = res.data.data;
      const sortedBooksByAuthor = allBooksByAuthor.sort((a, b) => new Date(b.bookReleaseDate) - new Date(a.bookReleaseDate));
      const recentBooksByAuthor = sortedBooksByAuthor.slice(0, 4); // Get the first four items

      setBooksByAuthor(recentBooksByAuthor);
    };

    getAuthorBooks();
  }, [authorName]);





  const authorBooks = books.filter((book) => book.bookAuthor === authorName);
  const totalSlides = authorBooks.length;

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
    {shouldRedirect(redirect)}
      <h1 style={{ fontFamily: "monospace", fontStyle: "italic", textAlign: "center" }}>
        Books by {authorName}
      </h1>

      <div style={{marginBottom: "2rem", marginTop: "2rem"}}>
     <FilterBoxes />

     </div> 

      <div id="authorCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {authorBooks.map((book, index) => (
            <div
              key={book._id}
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
            >
              <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
                    <div className="card-body">
                      <a href={`/book_single/${book._id}`} className="card-title">
                        {book.bookTitle}
                      </a>
                      <p className="card-text">{book.bookPrice}</p>
                      <button className="btn btn-primary" onClick={() => {
                    addItem(book, () => {
                      setRedirect(true);
                    });
                  }}
                  
                  >
                        <FaPlus className="mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#authorCarousel"
          data-bs-slide="prev"
          onClick={goToPrevSlide}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <FaChevronLeft />
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#authorCarousel"
          data-bs-slide="next"
          onClick={goToNextSlide}
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <FaChevronRight />
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
  <h1 style={{ fontFamily: "Times New Roman", fontStyle: "italic" }}>
    Upcoming books by author
  </h1>

  {booksByAuthor.length === 0 ? (
    <p>Author has no new books</p>
  ) : (
    <div className="row">
      {booksByAuthor.map((book) => (
        <div className="col-md-3" key={book._id}>
          <div className="card h-100">
            <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
            <div className="card-body">
              <a href={`/new_book_single/${book._id}`} className="card-title">
                {book.bookTitle}
              </a>
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
  )}
</div>


      
    </>
  );
}

export default AuthorBooks;
