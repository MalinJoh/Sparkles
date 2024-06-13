import express, { Request, Response } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';

// Skapa en instans av express
const app = express()

// Middleware för att kunna hantera JSON
app.use(express.json())

// Ange sökvägen till databasen
const dbPath = path.resolve(__dirname, "../database/sparklesDB.sqlite")
console.log("Databas sökväg:", dbPath)

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message)
  } else {
    console.log("Connected to the SQLite database.")
  }
})

// GET-endpoint för att hämta produkter baserat på kategori
app.get('/products/:category', (req: Request, res: Response) => {
  const category = req.params.category;
  db.all('SELECT * FROM products WHERE category = ?', [category], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).send('Database error')
      return
    }
    res.json(rows)
  })
})

// POST-endpoint för att lägga till en order
app.post('/orders', (req: Request, res: Response) => {
  const { productId, size, quantity, productName, price, firstName, lastName, shippingMethod, paymentMethod, address, city, postalCode } = req.body

  const sql = 'INSERT INTO orders (product_id, size, quantity, product_name, price, first_name, last_name, shipping_method, payment_method, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const params = [productId, size, quantity, productName, price, firstName, lastName, shippingMethod, paymentMethod, address, city, postalCode]

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Order insertion error:", err.message)
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ orderId: this.lastID })
  })
})

// Serve statiska filer från 'dist' mappen
const distPath = path.join(__dirname)
console.log("Serving static files from:", distPath)
app.use(express.static(distPath))

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
