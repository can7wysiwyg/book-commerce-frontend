import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/home/Footer";
import { Home } from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import Books from "./components/home/Books";

function App() {
  return (
    <div className="container">
      <Router>
 
      <NavBar />
      <main className="py-3">  
     <Routes>
    <Route path="/" element={<Home />} />
      
    <Route path="/books" element={ <Books />} />

     </Routes>
         
     </main>
    
     <Footer />
     </Router>
    </div>
  );
}

export default App;
