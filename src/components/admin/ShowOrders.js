import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { GlobalState } from "../../GlobalState";

function ShowOrders() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChange = (itemId, itemName) => {
    navigate(`/cart_show/${itemId}`, { state: { itemName } });
  };

  useEffect(() => {
    const getCustomers = async () => {
      const res = await axios.get("https://bookcommerce.onrender.com/cartt/show_carts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(res.data.carts);
    };

    getCustomers();
  }, [token]);

  if (items.length === 0) {
    return (
      <>
        <h1 style={{ fontFamily: "Helvetica", fontStyle: "oblique" }}>
          No Carts At The Moment...
        </h1>
      </>
    );
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="text-center">
        <h1>List of Carts</h1>
        <ul className="list-group">
          {currentItems.map((item, index) => (
            <li
              key={item._id}
              className="list-group-item text-primary"
              onClick={() => handleChange(item._id, item.fullname)}
              style={{ cursor: "pointer" }}
            >
              {item.fullname}
            </li>
          ))}
        </ul>
        <Pagination>
          {Array.from(Array(Math.ceil(items.length / itemsPerPage)).keys()).map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </>
  );
}

export default ShowOrders;
