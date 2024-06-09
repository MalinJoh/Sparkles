import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Checkout = ({ cartItems, onClearCart, onRemoveFromCart }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: '',
    paymentMethod: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const confirmOrder = () => {
    const { firstName, lastName, address, city, postalCode, shippingMethod, paymentMethod } = formData;
    if (!firstName || !lastName || !address || !city || !postalCode || !shippingMethod || !paymentMethod) {
      alert('Du har inte fyllt i alla nödvändiga fält')
      return
    }

    cartItems.forEach(item => {
      const order = {
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
        productName: item.name,
        price: item.price,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        postalCode: postalCode,
        shippingMethod: shippingMethod,
        paymentMethod: paymentMethod
      }
      axios.post('/orders', order)
        .then(response => {
          console.log('Ordern lagd:', response.data)
        })
        .catch(error => {
          console.error('Problem uppstod när ordern skulle läggas', error)
        })
    })

    onClearCart()
    navigate('/thank-you')
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <h1>Kassa</h1>
      {cartItems.length === 0 && <p>Varukorgen är tom</p>}
      <div className="checkout">
        <div className="left-side">
          {cartItems.map(item => (
            <Card className="cart-card" key={item.id} style={{ width: '100%' }}>
              <Card.Body className="d-flex">
                <img src={`./${item.image}`} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Pris: {item.price}</Card.Text>
                  <Card.Text>Storlek: {item.size}</Card.Text>
                  <Card.Text>Antal: {item.quantity}</Card.Text>
                  <Button className="btn-add" onClick={() => onRemoveFromCart(item.id)}>Ta bort</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
          {cartItems.length > 0 && (
            <div className="total-amount">
              <h3>Totalbelopp: {totalAmount} SEK</h3>
            </div>
          )}
          <Form className="ship-form">
            <Form.Label>Fraktsätt</Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Postnord"
                name="shippingMethod"
                value="Postnord"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="DHL"
                name="shippingMethod"
                value="DHL"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Instabox"
                name="shippingMethod"
                value="Instabox"
                onChange={handleChange}
              />
            </Col>
          </Form>
        </div>

        <div className="right-side">
          <Form className="payment-form">
            <Form.Label>Betalsätt</Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Klarna"
                name="paymentMethod"
                value="Klarna"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Kortbetalning"
                name="paymentMethod"
                value="Kortbetalning"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Swish"
                name="paymentMethod"
                value="Swish"
                onChange={handleChange}
              />
            </Col>
          </Form>
          <Form className="adress-form">
            <h2>Kontaktuppgifter</h2>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Förnamn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Förnamn"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Efternamn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Efternamn"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="+46 123 45 67"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>E-post adress</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="janedoe@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Form.Group>
              <Form.Label>Adress</Form.Label>
              <Form.Control
                placeholder="Gata&Nr"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Postnummer</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="12345"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Stad</Form.Label>
                <Form.Control
                  placeholder="T.ex Stockholm"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Button className="btn-add" variant="success" onClick={confirmOrder}>Bekräfta beställning</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
