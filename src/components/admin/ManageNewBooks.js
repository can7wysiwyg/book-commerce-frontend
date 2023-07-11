import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, OverlayTrigger, Tooltip, Modal, Form } from 'react-bootstrap';
import { GlobalState } from "../../GlobalState"
import axios from 'axios';

const ManageNewBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/newbook/show_all");
      setBooks(res.data.data);
    };

    getBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const booksPerPage = 5;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Search Bar */}
      <div style={{margin: "2rem"}}>
      <Form.Group >
        <Form.Control
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book._id}>
              <td>
                <img src={book.bookImage} alt={book.bookTitle} style={{ width: '50px' }} />
              </td>
              <td>{book.bookTitle}</td>
              <td>
                <Buttons book={book} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <span className="page-link">{index + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};





const Buttons = ({book}) => {
  const state = useContext(GlobalState)
  const token = state.token
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/newbook/delete_single/${book._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert(res.data.msg);

      window.location.href = '/new_book_management'
  
      
    } catch (error) {
      
    }
  };




  const deleteButtonTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;


  return(<>

<Button variant="primary" size="md" className="mr-2 mb-2 mb-md-0" onClick={() => setShowModal(true)}>
  Edit
</Button>

<OverlayTrigger placement="top" overlay={deleteButtonTooltip}>
  <Button variant="danger" size="md" onClick={handleDelete}>
    Delete
  </Button>
</OverlayTrigger>




      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Edit the book's info:</p>
              <ul>
                <li>
                  <a href={`/update_description/${book._id}`}>update book description</a>
                </li>
                <li>
                  <a href={`/update_release/${book._id}`}>update book release data</a>
                </li>
              
                <li>
                  <a href={`/newbook_update_picture/${book._id}`}>update book picture</a>
                </li>
              </ul>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


  
  </>)
}


export default ManageNewBooks;
