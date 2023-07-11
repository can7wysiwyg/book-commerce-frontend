import axios from "axios";
import "./books.css";
import { useEffect, useState } from "react";
import FilterBoxes from "./FilterBoxes";

function NewBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items per page as needed

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/newbook/show_all");
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

  if(books.length === 0) {
    return(<div className="text-center">
    <h1>two options</h1>
    <p>new books are loading...</p>
    <p>there are no new books at the moment</p>
    </div>)
  }

  return (
    <div className="container" >
        <h1 style={{fontFamily: "monospace", fontStyle: "italic", textAlign: "center"}}>upcoming books...</h1>

        <div style={{marginBottom: "3rem", marginTop: "3rem"}}>
     <FilterBoxes />

     </div>

      <div className="row" style={{marginBottom: "2rem"}}>
        {currentBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm" >
              <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
              <div className="card-body">
                <a href={`/new_book_single/${book._id}`} className="card-title" style={{ textDecoration: "none" }}>
                  {book.bookTitle}
                </a>
                <p className="card-title">{book.bookAuthor}</p>
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

export default NewBooks;
