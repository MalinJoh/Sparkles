import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


function Bracelets({ handleAddToCart }) {
  const [bracelets, setBracelets] = useState([])
  const [selectedSizes, setSelectedsSizes] = useState({})


  useEffect(() => {
    axios.get('/products/bracelet')
      .then((response) => {
        setBracelets(response.data)
      })
      .catch((error) => {
        console.error('Error fetching bracelets:', error);
      })
  }, [])

  const handleSize = (braceletId, size) => {
    setSelectedsSizes((prevSizes) => ({
      ...prevSizes,
      [braceletId]: size
    }))
  }


  const addToCartClick = (bracelet) => {
    const size = selectedSizes[bracelet.id]
    console.log("Selected size:", size)
    if (!size) {
      alert('Storlek måste väljas innan armbandet kan läggas till i varukorgen')
      return
    } else {
      handleAddToCart(bracelet, size)
    }
  }

  return (
    <>
      <h1>Armband</h1>
      <div className='grid-container-bracelets' >
        {bracelets.map((bracelet) => (
          <div className='grid-item' key={bracelet.id}>
            <Card style={{ width: '20rem' }}>
              <Card.Img className='card-img-bracelets' variant='top' src={`./${bracelet.image}`} alt={bracelet.name} />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{bracelet.name}</Card.Title>
                <Card.Text>Pris: {bracelet.price}</Card.Text>
                <Card.Text>{bracelet.description}</Card.Text>
                <Form.Group controlId={`size-select-${bracelet.id}`}>
                  <Form.Control as="select" onChange={(e) => handleSize(bracelet.id, parseInt(e.target.value))}>
                    <option value="">Välj storlek</option>
                    <option value="16">16 cm</option>
                    <option value="17">17 cm</option>
                    <option value="18">18 cm</option>
                    <option value="19">19 cm</option>
                  </Form.Control>
                </Form.Group>
                <Button className="btn-add" onClick={() => addToCartClick(bracelet)}>Lägg till i varukorg</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default Bracelets
