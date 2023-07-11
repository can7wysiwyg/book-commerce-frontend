import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import FilterBoxes from "./FilterBoxes";

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
       <div style={{marginBottom: "2rem", marginTop: "1rem"}}>
     <FilterBoxes />

     </div> 

     {currentItems.length > 0 ? (
  <div className="row">
    {currentItems.map((result) => (
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={result._id}>
        <div className="card">
          <img
            src={result.bookImage}
            alt={result.bookTitle}
            className="card-img-top"
          />
          <div className="card-body d-flex flex-column">
            <a href={`/book_single/${result._id}`} className="card-title">{result.bookTitle}</a>
            <p className="card-title">by {result.bookAuthor}</p>
            <p className="card-text">{result.bookPrice}</p>
            <button className="btn btn-primary btn-sm mt-auto">
              <FaPlus className="mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <h1 className="text-danger">No Books Of This Genre At The Moment...</h1>
)}
 

     
<nav>
  <ul className="pagination">{paginationItems()}</ul>
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
