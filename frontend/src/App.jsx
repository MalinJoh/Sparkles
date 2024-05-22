import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data)
      })
  }, [])
  return (
    <div>
      <h1>Produkter och pris</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}:{product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
