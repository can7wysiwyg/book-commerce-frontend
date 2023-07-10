import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { GlobalState } from "../../GlobalState";
import './navbar.css'; 
import { useContext } from 'react';
import { Link } from 'react-router-dom';

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
      {AdminLogin()}
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/new_books">New Books</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {isLogged ? loggedRouter() : ""}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
