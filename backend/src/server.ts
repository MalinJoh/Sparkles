import express, { Request, Response } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';

// Skapa en instans av express
const app = express()

// Middleware för att kunna hantera JSON
app.use(express.json())


// Anslut till SQLite-databasen
const db = new sqlite3.Database(path.resolve(__dirname, "../database/sparklesDB.sqlite"))

// GET-endpoint för att hämta produkter baserat på kategori
app.get('/products/:category', (req: Request, res: Response) => {
  const category = req.params.category
  db.all('SELECT * FROM products WHERE category = ?', [category], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send('Database error');
      return;
    }
    res.json(rows);
  })
})

// POST-endpoint för att lägga till en order
app.post('/orders', (req: Request, res: Response) => {
  const { productId, size, quantity, productName, price, firstName, lastName, shippingMethod, paymentMethod, address, city, postalCode } = req.body

  const sql = 'INSERT INTO orders (product_id, size, quantity, product_name, price, first_name, last_name, shipping_method, payment_method, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const params = [productId, size, quantity, productName, price, firstName, lastName, shippingMethod, paymentMethod, address, city, postalCode]

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ orderId: this.lastID })
  })
})


// Serve statiska filer från 'dist' mappen
app.use(express.static(path.join(path.resolve(), 'dist')))

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
