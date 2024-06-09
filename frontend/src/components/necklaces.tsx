import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'

interface Necklace {
  id: number
  name: string
  price: number
  description: string
  image: string
}

function Necklaces({ handleAddToCart }) {
  const [necklaces, setNecklaces] = useState<Necklace[]>([])

  useEffect(() => {
    axios.get('/products/necklace')
      .then((response) => {
        setNecklaces(response.data)
      })
      .catch((error) => {
        console.error('Error fetching necklaces:', error)
      })
  }, [])

  const addToCartClick = (necklace: Necklace) => {
    handleAddToCart(necklace, null)
  }

  return (
    <>
      <h1>Necklaces</h1>
      <div className="grid-container-necklaces">
        {necklaces.map(necklace => (
          <div className="grid-item" key={necklace.id}>
            <Card style={{ width: '100%' }}>
              <Card.Img className="card-img-necklaces"
                variant="top"
                src={`./${necklace.image}`}
                alt={necklace.name} />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{necklace.name}</Card.Title>
                <Card.Text>Pris: {necklace.price}</Card.Text>
                <Card.Text>{necklace.description}</Card.Text>
                <Button className="btn-add" onClick={() => addToCartClick(necklace)}>Lägg till i varukorgen</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default Necklaces
