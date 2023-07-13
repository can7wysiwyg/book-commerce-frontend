import axios from "axios";
import { useEffect, useState } from "react";
import {  Button, Pagination } from "react-bootstrap";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import { BsCartFill } from 'react-icons/bs';
import { addItem } from "../../api/CartApi";





function ByPrice() {
  
  const location = useLocation();
  const selectedOption = location.state;
  const[items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [redirect, setRedirect] = useState(false);

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/cart");
    }
  };



 useEffect(() => {

    const getBooks = async() => {

        const res = await axios.get('/book/show_all')
  
        setItems(res.data.data)
  
  
      }
  
      getBooks()
  

 }, [])

 function leggoo() {
    let filteredItems = [];
  
    if (selectedOption === "medium") {
      filteredItems = items.filter((item) => {
        const bookPrice = parseInt(item.bookPrice);
        return bookPrice >= 5000 && bookPrice <= 5555;
      });
    } else if (selectedOption === "lowest-medium") {
      filteredItems = items.filter((item) => {
        const bookPrice = parseInt(item.bookPrice);
        return bookPrice <= 5000;
      });
    } else if (selectedOption === "medium-highest") {
      filteredItems = items.filter((item) => {
        const bookPrice = parseInt(item.bookPrice);
        return bookPrice >= 5555;
      });
    }
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
    return (
      <>
 <div className="row" style={{marginBottom: "4rem"}}>       
          {currentItems.map((item) => (
 
 <div className="col-md-4 mb-4 my-3" key={item._id}  >
            <div className="card h-100 shadow-sm" style={{marginBottom: "3rem"}}>
              <img
                src={item.bookImage}
                alt={item.bookTitle}
                className="card-img-top"
              />
              <div className="card-body">
                <a
                  href={`/book_single/${item._id}`}
                  className="card-title"
                  style={{ textDecoration: "none" }}
                >
                  {item.bookTitle}
                </a>
                <p className="card-title">{item.bookAuthor}</p>
                <p className="card-text">MK {item.bookPrice}</p>
                <p className="card-text">released on: {moment(item.bookReleaseDate).format("MMM Do YYYY")} </p>
              </div>
              <div className="card-footer">
                <Button
                 variant="primary" className="mt-2"

                 onClick={() => {
                  addItem(item, () => {
                    setRedirect(true);
                  });
                }}


                >
                  <BsCartFill />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          ))}

          </div>
        
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </>
    );
  }
  


  return(<>
  {shouldRedirect(redirect)}
  <h1 className="text-center" style={{marginBottom: "2rem", fontFamily: "Times New Roman", fontStyle: "oblique"}}> these are {selectedOption} priced books..  </h1>
{
    leggoo()
}  
  
  </>)
}

export default ByPrice;
