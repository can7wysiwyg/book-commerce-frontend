import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

function AuthorBooks() {
  const location = useLocation();
  const authorName = location.state;

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/book/show_all");
      setBooks(res.data.data);
    };

    getBooks();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books
    .filter((book) => book.bookAuthor === authorName)
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    books.filter((book) => book.bookAuthor === authorName).length / itemsPerPage
  );
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="row">
        {currentBooks.map((book) => (
          <div className="col-md-3 mb-4" key={book._id}>
            <div className="card h-100">
              <img
                src={book.bookImage}
                alt={book.bookTitle}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{book.bookTitle}</h5>
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

      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
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
    </>
  );
}

export default AuthorBooks;
