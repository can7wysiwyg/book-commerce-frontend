import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Pagination } from "react-bootstrap";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import { BsCartFill } from 'react-icons/bs';




function ByPrice() {
  
  const location = useLocation();
  const selectedOption = location.state;

 const[items, setItems] = useState([])
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 6; // Number of items to display per page


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
        <Row>
          {currentItems.map((item) => (
            <Col key={item._id} sm={6} md={4} lg={3} className="my-3">
              <Card>
                <Card.Img variant="top" src={item.bookImage} alt={item.bookTitle} />
                <Card.Body>
                  <Card.Title>{item.bookTitle}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">By {item.bookAuthor}</small>
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      Release Date: {moment(item.bookReleaseDate).format("MMM Do YYYY")}
                    </small>
                  </Card.Text>
                  <Button variant="primary" className="mt-2">
                    <BsCartFill /> Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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
  <h1 className="text-center" style={{marginBottom: "2rem"}}> these are {selectedOption} priced books..  </h1>
{
    leggoo()
}  
  
  </>)
}

export default ByPrice;
