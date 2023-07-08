import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';

function Categories() {
  const state = useContext(GlobalState)
  const token = state.token
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  

  useEffect(() => {

    const getCats = async() => {
        const res = await axios.get("/genre/show_all")

        setCategories(res.data.data)

    }

    getCats()



  }, [])

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleAddCategory = async(e) => {
    e.preventDefault();
    const res = await axios.post('/genre/create', {name}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    alert(res.data.msg)

    window.location.href = "/categories"
    
  };

  const handleDeleteCategory = (category) => {
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c !== category)
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const categoryVariants = {
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
      className="container d-flex justify-content-center "
      style={{ minHeight: '100vh' }}
      initial="hidden"
      animate="visible"
    >
      <div className="col-md-12 col-lg-6">
        <h1>Categories</h1>
        <form onSubmit={handleAddCategory} style={{ marginBottom: '2rem' }}>
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
             style={{marginRight: "2rem"}}
              placeholder="Enter category name"
              value={name}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary d-block d-sm-inline-block mt-3 mt-sm-0"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>

        <ul className="list-group">
          {currentCategories?.map((category, index) => (
            <motion.li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center mb-2"
            variants={categoryVariants}
          >
            {category.name}
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteCategory(category)}
            >
              Delete
            </button>
          </motion.li>
            
          ))}
        </ul>

        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        
      </div>
    </motion.div>
  );
}



export default Categories;
