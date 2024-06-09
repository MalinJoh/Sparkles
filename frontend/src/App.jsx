import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Rings from './components/rings.jsx';
import Bracelets from './components/bracelets.jsx';
import Necklaces from "./components/necklaces.tsx";
import NavigationBar from './components/navigationBar.jsx';
import Checkout from "./components/checkout.jsx";
import ThankYou from "./components/thankyou.jsx";
import { clearCart, removeFromCart, handleAddToCart } from "./components/cartFunctions.js";
import Notification from "./components/notification.jsx";

function App() {
  const [cartItems, setCartItems] = useState([])
  const [notification, setNotification] = useState(false)
  const [message, setMessage] = useState('')

  const onRemoveFromCart = (itemId) => {
    removeFromCart(itemId, setCartItems)
  }

  const onClearCart = () => {
    clearCart(setCartItems)
  }

  const addToCartWrapper = (item, size) => {
    handleAddToCart(item, size, setCartItems, setNotification, setMessage)
  }

  return (
    <div>
      <NavigationBar cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
      <Notification message={message} show={notification} onClose={() => setNotification(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rings" element={<Rings handleAddToCart={addToCartWrapper} />} />
        <Route path="/bracelets" element={<Bracelets handleAddToCart={addToCartWrapper} />} />
        <Route path="/necklaces" element={<Necklaces handleAddToCart={addToCartWrapper} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} onClearCart={onClearCart} />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  )
}

export default App
