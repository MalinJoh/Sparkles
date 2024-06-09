import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Rings({ handleAddToCart }) {
  const [rings, setRings] = useState([])
  const [selectedSizes, setSelectedSizes] = useState({})

  useEffect(() => {
    axios.get('/products/ring')
      .then((response) => {
        setRings(response.data)
      })
      .catch((error) => {
        console.error('Error fetching rings:', error);
      })
  }, [])

  const handleSize = (ringId, size) => {
    setSelectedSizes(prevSizes => ({
      ...prevSizes,
      [ringId]: size
    }))
  }

  const addToCartClick = (ring) => {
    const size = selectedSizes[ring.id]
    console.log("Selected size for ring:", size)
    if (!size) {
      alert('Storlek måste väljas innan ringen kan läggas till i varukorgen')
      return
    } else {
      handleAddToCart(ring, size)
    }
  }

  return (
    <>
      <h1>Ringar</h1>
      <div className="grid-container-rings">
        {rings.map((ring) => (
          <div className="grid-item" key={ring.id}>
            <Card style={{ width: '100%' }}>
              <Card.Img className="card-img-rings"
                variant="top"
                src={`./${ring.image}`}
                alt={ring.name} />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{ring.name}</Card.Title>
                <Card.Text>Pris: {ring.price}</Card.Text>
                <Card.Text>{ring.description}</Card.Text>
                <Form.Group controlId={`size-select-${ring.id}`} required>
                  <Form.Control as="select" onChange={(e) => handleSize(ring.id, parseInt(e.target.value))}>
                    <option value="">Välj Storlek</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </Form.Control>
                </Form.Group>
                <Button className="btn-add" onClick={() => addToCartClick(ring)}>Lägg till i varukorgen</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default Rings
