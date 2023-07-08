import React, { useState, useEffect } from 'react';
import "./books.css"

function Books() {
 
    const products = [
        {
            id:1,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
            title: "to kill a mocking bird",
            description: "justice exists in gray",
            price: 222

    
        },
    
        {
            id:2,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
            title: "to kill a mocking bird",
            description: "justice exists in gray",
            price: 222

    
    
        },
        {
            id:3,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
            title: "to kill a mocking bird",
            description: "justice exists in gray",
            price: 222

    
    
        },
        {
            id:4,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
            title: "to kill a mocking bird",
            description: "justice exists in gray",
            price: 222

    
    
        }
    ]
    


    return(<>
        <div className="container">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.imageUrl} alt={product.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    
    
    </>)
}

export default Books