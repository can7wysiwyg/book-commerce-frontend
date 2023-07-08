import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/home/Footer";
import { Home } from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import Books from "./components/home/Books";
import BookSingle from "./components/home/BookSingle";

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

     </Routes>
         
     </main>
    
     <Footer />
     </Router>
    </div>
  );
}

export default App;
