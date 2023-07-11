import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";

const BookTitleUpdate = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const token = state.token;
  const [bookTitle, setNewTitle] = useState("");

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(`/book/update_info/${id}`, { bookTitle }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = `/book_single/${id}`;
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="mb-4" style={{fontFamily: "Times New Roman"}}>Update Book Title</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="New book title"
              className="form-control"
              id="bookTitle"
              name="bookTitle"
              value={bookTitle}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Book Title
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTitleUpdate;
