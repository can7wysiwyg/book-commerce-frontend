
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Pagination } from "react-bootstrap";

function SearchBooks() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);

    setTypingTimeout(timeout);
  };

  const performSearch = async (value) => {
    try {
      if (value.trim() === "") {
        setResults([]);
      } else {
        setIsLoading(true);
        setError(null);

        const response = await axios.get("/book/show_all");
        const bookData = response.data.data;

        const filteredResults = bookData.filter((book) => {
          const { bookTitle, bookAuthor } = book;

          return (
            bookTitle.toLowerCase().includes(value.toLowerCase()) ||
            bookAuthor.toLowerCase().includes(value.toLowerCase())
          );
        });

        setResults(filteredResults);
        setCurrentPage(1);
      }
    } catch (error) {
      setError("An error occurred while fetching search results.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="form-control mb-3"
        placeholder="Search for  books..."
      />

      {error && <p className="text-danger">{error}</p>}

      {query && (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : currentResults.length > 0 ? (
            currentResults.map((book) => (
              <DisplayBooks key={book._id} book={book} />
            ))
          ) : (
            <p>No books found.</p>
          )}

          <Pagination className="mt-3">
            {Array.from(Array(Math.ceil(results.length / resultsPerPage)), (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
}





const DisplayBooks = ({book}) => {

    
    return(<>

<Card   className="mb-3">
                <Card.Body>
                  <Card.Title>{book.bookTitle}</Card.Title>
                  <Card.Text>Author: {book.bookAuthor}</Card.Text>
                  <Button variant="primary" href={`/book_single/${book._id}`}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>

    
    
    
    
    </>)
}



export default SearchBooks
