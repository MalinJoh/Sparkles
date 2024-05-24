import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Cart from './cart';



function Rings() {
  const [rings, setRings] = useState([])
  const [selectedSizes, setSelectedSize] = useState({})
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    axios.get('/products/rings')
      .then((response) => {
        setRings(response.data)
      })
      .catch((error) => {
        console.error('Error fetching rings:', error);
      })
  }, [])

  const handleSize = (ringId, size) => {
    setSelectedSize(prevSizes => ({
      ...prevSizes,
      [ringId]: size
    }))
  }

  const handleAddToCart = (ring) => {
    const size = selectedSizes[ring.id]
    if (size) {
      const newItem = {
        ...ring,
        size
      }
      setCartItems([...cartItems, newItem])
    } else {
      alert('Storlek måste väljas innan ringen kan läggas till i varukorgen')
    }
  }

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  return (
    <div>
      <h1>Ringar</h1>
      <div className="grid-container">
        {rings.map(ring => (
          <div className="grid-item" key={ring.id}>
            <Card style={{ width: '25rem' }}>
              <Card.Img className="card-img-custom"
                variant="top"
                src={`./${ring.image}`}
                alt={ring.name} />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{ring.name}</Card.Title>
                <Card.Text>Pris: {ring.price}</Card.Text>
                <Card.Text>{ring.description}</Card.Text>
                <Form.Group controlId={`size-select-${ring.id}`}>
                  <Form.Control as="select" onChange={(e) => handleSize(ring.id, parseInt(e.target.value))}>
                    <option value="">Välj Storlek</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={() => handleAddToCart(ring)}>Lägg till i varukorgen</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} />
    </div>
  )
}

export default Rings
