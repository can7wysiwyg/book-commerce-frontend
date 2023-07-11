import axios from "axios";
import "./books.css";
import { useEffect, useState } from "react";
import FilterBoxes from "./FilterBoxes";

function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items per page as needed

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/book/show_all");
      setBooks(res.data.data);
    };

    getBooks();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" >
      <div style={{marginBottom: "2rem", marginTop: "1rem"}}>
     <FilterBoxes />

     </div>

      <div className="row" style={{marginBottom: "2rem"}}>
        {currentBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm" >
              <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
              <div className="card-body">
                <a href={`/book_single/${book._id}`} className="card-title" style={{ textDecoration: "none" }}>
                  {book.bookTitle}
                </a>
                <p className="card-text">MK {book.bookPrice}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Buy Now</button>
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
    </div>
  );
}

export default Books;
