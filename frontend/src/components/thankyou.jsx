import React from "react";

const ThankYou = () => {
  return (
    <div>
      <h1>Tack för din beställning!</h1>
      <div className="text">
        <p>Din beställning har mottagits och behandlas. Du får ett mail när din order är påväg!</p>
      </div>
      <img className="img-stones" alt="Gemstones" src='./Bilder/stones.jpg' />
    </div>
  )
}

export default ThankYou
