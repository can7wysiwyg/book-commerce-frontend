import React from "react";
import { useParams } from "react-router-dom";


const UpdateList = () => {
    const{id} = useParams()
    
  return (
    <div className="container">
      <h1>What would you like to update?</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <a href={`/book_title/${id}`}>Book Title</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_author/${id}`}>Book Author</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_price/${id}`}>Book Price</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_description/${id}`}>Book Description</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_release/${id}`}>Book Release Date</a>
        </li>
      </ul>
    </div>
  );
};

export default UpdateList;
