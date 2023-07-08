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
    <Route path="/manage_books" element={<ManageBooks />} />
    <Route path="/upload_books" element={<UploadBooks />}  />
    <Route path="/aquarium" element={<Login />} />
    <Route path="/book_single/:id" element={<BookSingle />} />



     </Routes>

     </main>

     <Footer />
     </Router>
            </div>
            );
}

export default App;
