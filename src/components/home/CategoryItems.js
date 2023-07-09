import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

function CategoryItems() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

  useEffect(() => {
    const getBooksByGenre = async () => {
      try {
        const res = await axios.get("/book/show_all");
        setResults(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getBooksByGenre();
  }, [id]);

  function byCatDisplay() {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results
      .filter((result) => result.bookGenre === id)
      .slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        <div className="row">
          {currentItems.map((result) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={result._id}>
              <div className="card h-100">
                <img
                  src={result.bookImage}
                  alt={result.bookTitle}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{result.bookTitle}</h5>
                  <p className="card-text">{result.bookPrice}</p>
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
            {paginationItems()}
          </ul>
        </nav>
      </>
    );
  }

  const paginationItems = () => {
    const totalPages = Math.ceil(
      results.filter((result) => result.bookGenre === id).length / itemsPerPage
    );
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      </li>
    ));
  };

  return <>{byCatDisplay()}</>;
}

export default CategoryItems;
