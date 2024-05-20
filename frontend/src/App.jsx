import React from 'react'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`)
      })
  }, [])
}

export default App
