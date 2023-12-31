import axios from "axios";
import "./books.css";
import { useEffect, useState } from "react";
import FilterBoxes from "./FilterBoxes";
import { addItem } from "../../api/CartApi";

function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if(books.length === 0) {
    return(<div style={{textAlign: "center", fontFamily: "fantasy", fontStyle: "italic"}}>
    <h1> please, wait as books load... patience is a virtual.. remember that.🙂🙂🙂</h1>
    
    </div>)
  }

  return (
    <div className="container">
      {shouldRedirect(redirect)}
      <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
        <FilterBoxes />
      </div>

      <div className="row" style={{ marginBottom: "2rem" }}>
        {currentBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.bookImage}
                alt={book.bookTitle}
                className="card-img-top"
                style={{
                  width: "100%",
                  maxHeight: "30vh",
                  objectFit: "contain"
                }}
              />
              <div className="card-body">
                <a
                  href={`/book_single/${book._id}`}
                  className="card-title"
                  style={{ textDecoration: "none" }}
                >
                  {book.bookTitle}
                </a>
                <p className="card-text">MK {book.bookPrice}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addItem(book, () => {
                      setRedirect(true);
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Books;
