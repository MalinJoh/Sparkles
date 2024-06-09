export const handleAddToCart = (item, size, setCartItems, setNotification, setMessage) => {
  setCartItems(prevCartItems => {
    const itemExists = prevCartItems.find(cartItem => cartItem.id === item.id)
    if (itemExists) {
      return prevCartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    } else {
      const newCartItems = [...prevCartItems, { ...item, size: size || 'One size', quantity: 1 }]
      setMessage(`${item.name} har lagts till i varukorgen!`)
      setNotification(true)
      setTimeout(() => setNotification(false), 2000)
      return newCartItems
    }
  })
}

export const removeFromCart = (itemId, setCartItems) => {
  setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId))
}

export const clearCart = (setCartItems) => {
  setCartItems([])
}
