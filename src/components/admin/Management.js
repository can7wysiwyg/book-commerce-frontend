import React from 'react';
import { motion } from 'framer-motion';

function Management() {
  const adminPanelVariants = {
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
      className="container"
      initial="hidden"
      animate="visible"
      variants={adminPanelVariants}
    >
      <h1>Admin Panel</h1>
      <div className="row">
        <motion.div className="col-md-4 mb-4" variants={adminPanelVariants}>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <div className="card-body">
              <a href="/upload_books" className="card-title">Upload Books</a>
              <p className="card-text">Upload Books For The Site.</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="col-md-4 mb-4" variants={adminPanelVariants}>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <div className="card-body">
              <a href='/categories' className="card-title">Categories</a>
              <p className="card-text">Create And Manage Categories</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="col-md-4 mb-4" variants={adminPanelVariants}>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <div className="card-body">
              <a href='/book_management' className="card-title">Book Management</a>
              <p className="card-text">Manage Books On The Site</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Management;
