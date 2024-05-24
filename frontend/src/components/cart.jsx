import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cart = ({ cartItems, onRemoveItem }) => {
  const handleCheckout = () => {
    cartItems.forEach(item => {
      const order = {
        productId: item.id,
        size: item.size,
        quantity: 1,
        productName: item.name,
        price: item.price
      }
      axios.post('/orders', order)
        .then(response => {
          console.log('Ordern lagd:', response.data)
        })
        .catch(error => {
          console.error('Problem uppstod när ordern skulle läggas', error);
        })
    })
  }
  return (
    <div className='cart'>
      <h2>Varukorg</h2>
      {cartItems.map(item => (
        <Card key={item.id} style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Pris: {item.price}</Card.Text>
            <Card.Text>Storlek: {item.size}</Card.Text>
            <Button variant='danger' onClick={() => onRemoveItem(item.id)}>Ta bort</Button>
          </Card.Body>
        </Card>
      ))}
      <Button variant='success' onClick={handleCheckout}>Gå till kassan</Button>
    </div>
  )
}

export default Cart
