import React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";



const BookDateUpdate = () => {
    const {id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const [bookReleaseDate, setNewRelease] = useState("");

    const handleChange = (event) => {
      setNewRelease(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      await axios.put(`/book/update_info/${id}`, { bookReleaseDate }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = `/book_single/${id}`;
    };
  

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="mb-4" style={{fontFamily: "Times New Roman"}}>Update Date Book Was Published</h1>
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="date" className="form-control" id="date" name="bookReleaseDate" value={bookReleaseDate} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Date</button>
      </form>
    </div>
    </div>
  );
};

export default BookDateUpdate
