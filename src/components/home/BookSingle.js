import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function BookSingle() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const[relatedBooks, setRelatedBooks] = useState([])
  



  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`/book/get_single/${id}`);
      setBook(res.data.books);
    };

    getBook();


const getAllBooks = async() => {

  const res = await axios.get('/book/show')

  setRelatedBooks(res.data.results)

}


    
    
    getAllBooks()
    
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4">
              <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.bookTitle}</h5>
                <p className="card-text" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  {book.bookDescription}
                </p>
                <p className="card-text">{book.bookAuthor}</p>
                <p className="card-text">MK {book.bookPrice}</p>
                <div className="d-flex align-items-center mb-3">
                  <button className="btn btn-secondary" onClick={decrementQuantity}>
                    <FaMinus />
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button className="btn btn-secondary" onClick={incrementQuantity}>
                    <FaPlus />
                  </button>
                </div>
                <button className="btn btn-primary">
                  <FaShoppingCart className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2>Related Products</h2>
        <div className="row">
{
  relatedBooks?.map((relatedBook) => {
    return  relatedBook.bookGenre === book.bookGenre ? <div className="col-md-3 mb-4" key={relatedBook.id}>
    <div className="card h-100">
      <img src={relatedBook.bookImage} alt={relatedBook.bookTitle} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{relatedBook.bookTitle}</h5>
        <p className="card-text">{relatedBook.bookPrice}</p>
        <button className="btn btn-primary">
          <FaPlus className="mr-1" />
          Add to Cart
        </button>
      </div>
    </div>
  </div> : null
  })
}
          
        </div>
      </div>
    </>
  );
}

export default BookSingle;
