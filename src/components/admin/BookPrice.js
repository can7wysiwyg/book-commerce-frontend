import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";

const BookPrice = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const token = state.token;
  const [bookPrice, setNewPrice] = useState("");

  const handleChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   const res = await axios.put(`https://bookcommerce.onrender.com/book/update_info/${id}`, { bookPrice }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    alert(res.data.msg);

    window.location.href = `/book_single/${id}`;
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="mb-4" style={{fontFamily: "Times New Roman"}}>Update Book Price</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="New book price"
              className="form-control"
              id="bookPrice"
              name="bookPrice"
              value={bookPrice}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Book Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookPrice;
