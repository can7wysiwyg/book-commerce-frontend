import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/home/Footer";
import { Home } from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import Books from "./components/home/Books";
import BookSingle from "./components/home/BookSingle";
import Management from "./components/admin/Management"
import Categories from "./components/admin/Categories";
import ManageBooks from "./components/admin/ManageBooks";
import UploadBooks from "./components/admin/UploadBooks"
import Login from "./components/admin/Login";
import ByPrice from "./components/home/ByPrice";
import CategoryItems from "./components/home/CategoryItems";
import AuthorBooks from "./components/home/AuthorBooks";
import UpcomingBook from "./components/admin/UpcomingBook";
import NewBooks from "./components/home/NewBooks";
import SearchBooks from "./components/home/SearchBooks";
import NewBookSingle from "./components/home/NewBookSingle";
import UpdateList from "./components/admin/UpdateList";
import BookUpdatePicture from "./components/admin/BookUpdatePicture";
import BookTitleUpdate from "./components/admin/BookTitleUpdate";
import BookAuthor from "./components/admin/BookAuthor";
import BookDescriptionUpdate from "./components/admin/BookDescriptionUpdate";
import BookDateUpdate from "./components/admin/BookDateUpdate";
import BookPrice from "./components/admin/BookPrice";
import ManageNewBooks from "./components/admin/ManageNewBooks";
import NewBookCover from "./components/admin/NewBookCover";
import NewBookDescription from "./components/admin/NewBookDescription";
import NewBookRelease from "./components/admin/NewBookRelease";
import Cart from "./components/home/Cart";
import ShowOrders from "./components/admin/ShowOrders";
import CartShow from "./components/admin/CartShow";


function App() {
  return (
    <div className="container">
      <Router>

      <NavBar />
      <main className="py-3">  
     <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/books" element={ <Books />} />
    <Route path="/book_single" element={<BookSingle />} />
    <Route path="/management" element={<Management />}/>
    <Route path="/categories" element={<Categories />} />
    <Route path="/book_management" element={<ManageBooks />} />
    <Route path="/upload_books" element={<UploadBooks />}  />
    <Route path="/aquarium" element={<Login />} />
    <Route path="/book_single/:id" element={<BookSingle />} />
    <Route path="/by_price" element={<ByPrice />} />
    <Route path="/category/:id" element={<CategoryItems />} />
    <Route path="/author_books" element={<AuthorBooks />} />
    <Route path="/upcoming_book" element={<UpcomingBook />} />
    <Route path="/new_books" element={<NewBooks />} />
    <Route path="/search_books" element={<SearchBooks />} />
    <Route path="/new_book_single/:id" element={<NewBookSingle />} />
    <Route path="/update_list/:id" element={<UpdateList />} />
    <Route path="/book_update_picture/:id" element={<BookUpdatePicture />} />
    <Route path="/book_title/:id" element={<BookTitleUpdate />} />
    <Route path="/book_author/:id" element={<BookAuthor />} />
    <Route path="/book_description/:id" element={<BookDescriptionUpdate />} />
    <Route path="/book_release/:id" element={<BookDateUpdate />} />
    <Route path="/book_price/:id" element={<BookPrice />} />
    <Route path="/new_book_management" element={<ManageNewBooks />} />
    <Route path="/newbook_update_picture/:id" element={<NewBookCover />} />
    <Route path="/update_description/:id" element={<NewBookDescription />} />
    <Route path="/update_release/:id" element={<NewBookRelease />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/show_orders" element={<ShowOrders />} />
    <Route path="/cart_show/:id" element={<CartShow />} />




     </Routes>

     </main>

     <Footer />
     </Router>
            </div>
            );
}

export default App;
