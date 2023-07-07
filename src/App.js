import Footer from "./components/home/Footer";
import { Home } from "./components/home/Home";
import NavBar from "./components/nav/NavBar";

function App() {
  return (
    <div className="container">
      <NavBar />
     <Home />
     <Footer />
    </div>
  );
}

export default App;
