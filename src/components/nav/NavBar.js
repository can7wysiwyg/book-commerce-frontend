import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { GlobalState } from "../../GlobalState";
import './navbar.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { itemTotal } from "../../api/CartApi"


const NavBar = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  const logoutUser = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  function Webname() {
    if (isLogged !== true) {
      return (
        <Link className="navbar-brand" to="/">
          Your Logo
        </Link>
      );
    } else {
      return (
        <Link className="navbar-brand" to="/">
          Admin
        </Link>
      );
    }
  }

  const loggedRouter = () => {
    return (
      <Nav>
        <Link className="nav-link" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </Nav>
    );
  };

  const AdminRoute = () => {
    return (
      <Nav>
        <NavDropdown title="Management" id="basic-nav-dropdown">
          <NavDropdown.Item href="/management">Admin Panel</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };

  const AdminLogin = () => {
    if (isAdmin) {
      return AdminRoute();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {Webname()}
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/new_books">New Books</Nav.Link>
          <Nav.Link href="/search_books">Search Books</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isLogged ? loggedRouter() : ""}
          {AdminLogin()}

          <Nav.Link href="/cart" className="d-flex justify-content-center justify-content-lg-start">
  <FontAwesomeIcon icon={faShoppingCart} />
  <span>{itemTotal()}</span>
</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
