import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';



function UpcomingBook() {
    const state = useContext(GlobalState)
    const token = state.token
     const [values, setValues] = useState({
       bookTitle: "",
       bookGenre: "",
       bookDescription: "",
       bookAuthor: "",
       bookReleaseDate: "",
       bookPrice: ""
     });
   
     const[bookImage, setBookImage] = useState("")
     const [categories, setCategories] = useState([]);
   
     useEffect(() => {
   
       const getCats = async() => {
           const res = await axios.get("/genre/show_all")
   
           setCategories(res.data.data)
   
       }
   
       getCats()
   
   
   
     }, [])
   
   
   
   
     const handleChange = (e) => {
       const { name, value } = e.target;
       setValues((prevData) => ({
         ...prevData,
         [name]: value,
       }));
     };
   
     const handleImageUpload = (event) => {
       const file = event.target.files[0];
       setBookImage(file);
     };
   
   
     const handleSubmit = async(e) => {
       e.preventDefault();
       let formData = new FormData()
       
       formData.append('bookImage', bookImage)
       formData.append('bookTitle', values.bookTitle)
       formData.append('bookPrice', values.bookPrice)
       formData.append('bookAuthor', values.bookAuthor)
       formData.append('bookDescription', values.bookDescription)
       formData.append('bookGenre', values.bookGenre)
       formData.append('bookReleaseDate', values.bookReleaseDate)
   
       const res = await axios.post("/newbook/create", formData, {
         headers: {
           Authorization: `Bearer ${token}`
         }
   
       })
   
       alert(res.data.msg)
       
       window.location.href = "/books"
       
     };
   
     const formVariants = {
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
   



    return(<motion.div
        className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
          initial="hidden"
          animate="visible"
          variants={formVariants}
          
        >
            <div className="col-md-6"> 
                 <h1>Upload Upcoming Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book Title</label>
              <input
                type="text"
                name="bookTitle"
                value={values.bookTitle}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Book Author</label>
              <input
                type="text"
                name="bookAuthor"
                value={values.bookAuthor}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
                   <select 
                    name="bookGenre"
                    value={values.bookGenre}
                    onChange={handleChange}
                    required>
    
          <option value="">Select Book Genre</option>
                    {categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
    
    
              </select>
             
            </div>
            <div className="form-group">
              <label>Publication Year</label>
              <input
                type="date"
                name="bookReleaseDate"
                value={values.bookReleaseDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Book Price</label>
              <input
                type="text"
                name="bookPrice"
                value={values.bookPrice}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Book Description</label>
              <textarea
                name="bookDescription"
                value={values.bookDescription}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Book Image </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="form-control"
                required
                accept=".jpg"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
        </motion.div>)
}

export default UpcomingBook