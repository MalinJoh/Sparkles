import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


function NavigationBar({ cartItems, onRemoveFromCart }) {

  const isCartEmpty = cartItems.length === 0
  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Container>
          <Navbar.Brand className="nav-title" as={Link} to="/">SPARKLES</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/rings" className="nav-link">Ringar</Nav.Link>
              <Nav.Link as={Link} to="/bracelets" className="nav-link">Armband</Nav.Link>
              <Nav.Link as={Link} to="/necklaces" className="nav-link">Halsband</Nav.Link>
            </Nav>
            <Dropdown className="ml-auto">
              <Dropdown.Toggle className="btn-nav" variant="success" id="dropdown-basic">
                Varukorg ({cartItems.length})
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {cartItems.length === 0 ? (
                  <Dropdown.Item disabled>Varukorgen är tom</Dropdown.Item>
                ) : (
                  cartItems.map((item, index) => (
                    <Dropdown.Item className="dropdown-text" key={index}>
                      {item.name} - {item.quantity} st <br />
                      {item.price} :-          <Button className="btn-cart" onClick={() => { onRemoveFromCart(item.id) }}>Ta bort</Button>
                    </Dropdown.Item>
                  ))
                )}

                <Dropdown.Divider />
                <Dropdown.Item as={Link} disabled={isCartEmpty} to="/checkout">Gå till kassan</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
