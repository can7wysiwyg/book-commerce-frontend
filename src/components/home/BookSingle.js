import { useState } from 'react';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';


function BookSingle() {
    const [quantity, setQuantity] = useState(1);


    // useEffect(() => {
    //     // Fetch data for the single product
    //     axios.get(`https://api.example.com/products/${productId}`)
    //       .then(response => {
    //         setProduct(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching product:', error);
    //       });
    
    //     // Fetch data for related products by genre
    //     axios.get(`https://api.example.com/products?genre=${product?.genre}&limit=4`)
    //       .then(response => {
    //         setRelatedProducts(response.data.filter(p => p.id !== productId));
    //       })
    //       .catch(error => {
    //         console.error('Error fetching related products:', error);
    //       });
    //   }, [productId, product?.genre]);
    


    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1);
        }
      };

      const relatedProducts = [
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

        <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg" alt="hello" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">fff</h5>
              <p className="card-text">jjjjj</p>
              <p className="card-text">333</p>
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
        {relatedProducts.map(relatedProduct => (
          <div className="col-md-3 mb-4" key={relatedProduct.id}>
            <div className="card h-100">
              <img src={relatedProduct.imageUrl} alt={relatedProduct.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{relatedProduct.title}</h5>
                <p className="card-text">{relatedProduct.price}</p>
                <button className="btn btn-primary">
                  <FaPlus className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      </div>

    
    
    </>)
}

export default BookSingle