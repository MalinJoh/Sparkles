import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, show, onClose }) => {
  return (
    <Alert style={{ position: 'fixed', top: '20px', zIndex: 1000 }} show={show} variant='success' onClose={onClose} dismissible>
      {message}
    </Alert>
  )
}

export default Notification
