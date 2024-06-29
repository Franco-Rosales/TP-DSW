import Nav from 'react-bootstrap/Nav';
import './NavBar.css';
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <div className="navbar-bg text-center py-3">
        <h1 className="text-light"><i className="bi bi-cake2-fill mx-4"></i>Gourmet en Casa</h1>
      </div>
      <Nav variant="tabs" defaultActiveKey="/" className="navbar-bg">
        <Nav.Item>
          <Nav.Link as={Link} to="/" className='nav-link text-light'>Inicio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/recetas" className='nav-link text-light'>Recetas</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}