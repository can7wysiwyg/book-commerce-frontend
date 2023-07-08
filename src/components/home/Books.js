import axios from "axios"
import "./books.css"
import { useEffect, useState} from "react"

function Books() {

  const[books, setBooks] = useState([])

  useEffect(() => {

    const getBooks = async() => {

      const res = await axios.get('/book/show_all')

      setBooks(res.data.data)


    }

    getBooks()



  }, [])


 
    

    return(<>
        <div className="container">
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm">
              <img src={book.bookImage} alt={book.bookTitle} className="card-img-top" />
              <div className="card-body">
                <a href={`/book_single/${book._id}`} className="card-title" style={{textDecoration: "none"}}>{book.bookTitle}</a>
                <p className="card-text">MK {book.bookPrice}</p>
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