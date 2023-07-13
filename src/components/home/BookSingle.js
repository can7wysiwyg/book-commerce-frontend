import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBoxes from './FilterBoxes';
import { addItem } from "../../api/CartApi";


function BookSingle() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [book, setBook] = useState({});
  const[relatedBooks, setRelatedBooks] = useState([])
  const [redirect, setRedirect] = useState(false);

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/cart");
    }
  };

  



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

 
  const handleRedirect = async() => {
    const authorName = book.bookAuthor
    navigate('/author_books', {state: authorName})
  }


  return (
    <>
       <div className="container">
       {shouldRedirect(redirect)}
       <div style={{marginBottom: "2rem", marginTop: "1rem"}}>
     <FilterBoxes />

     </div>


        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4">
              <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.bookTitle}</h5>
                <p className="card-text" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  {book.bookDescription}
                </p>
                <p className="card-text text-primary" onClick={handleRedirect}>{book.bookAuthor}</p>
                <p className="card-text">MK {book.bookPrice}</p>
                
                <button className="btn btn-primary"  onClick={() => {
                    addItem(book, () => {
                      setRedirect(true);
                    });
                  }}
                  
                  >
                  <FaShoppingCart className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div> 
        

        <h2>Related Books</h2>
        <div className="row">
{
  relatedBooks?.map((relatedBook) => {
    return  relatedBook.bookGenre === book.bookGenre ? <div className="col-md-3 mb-4" key={relatedBook.id}>
    <div className="card h-100">
      <img src={relatedBook.bookImage} alt={relatedBook.bookTitle} className="card-img-top" />
      <div className="card-body">
        <a href={`/book_single/${relatedBook._id}`} className="card-title">{relatedBook.bookTitle}</a>
        <p style={{fontWeight: "bold"}}>{relatedBook.bookAuthor}</p>
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
