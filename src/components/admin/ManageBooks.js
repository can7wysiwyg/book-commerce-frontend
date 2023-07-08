import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handlePublicationYearChange = (e) => {
    setPublicationYear(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      genre,
      publicationYear,
      price,
      description,
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
    clearForm();
  };

  const handleDeleteBook = (index) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublicationYear('');
    setPrice('');
    setDescription('');
  };

  useEffect(() => {
    // Fetch books data from API or local storage
    // Example: fetchBooks();
  }, []);

  const bookVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={bookVariants}
    >
      <h1>Manage Books</h1>
      <form onSubmit={handleAddBook}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            className="form-control"
            value={genre}
            onChange={handleGenreChange}
          />
        </div>
        <div className="form-group">
          <label>Publication Year</label>
          <input
            type="text"
            className="form-control"
            value={publicationYear}
            onChange={handlePublicationYearChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
      <hr />
      <h2>Book List</h2>
      <ul className="list-group">
        {books.map((book, index) => (
          <motion.li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            variants={bookVariants}
          >
            <div>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <p>{book.genre}</p>
              <p>{book.publicationYear}</p>
              <p>{book.price}</p>
              <p>{book.description}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteBook(index)}
            >
              Delete
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default ManageBooks;
