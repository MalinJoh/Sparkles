const express = require('express'),
  path = require('path')
const sqlite3 = require('sqlite3').verbose()

const app = express()

app.use(express.json());

const db = new sqlite3.Database(path.resolve(__dirname, "database/sparklesDB.sqlite"))

app.get('/products/rings', (_req, res) => {
  db.all('SELECT * FROM products WHERE category = ?', ['ring'], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send('Database error')
      return
    }
    res.json(rows)
  })
})

app.post('/orders', (req, res) => {
  const { productId, size, quantity, productName, price } = req.body

  const sql = 'INSERT INTO orders (product_id, size, quantity, product_name, price) VALUES (?, ?, ?, ?, ?)'
  const params = [productId, size, quantity, productName, price]

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ orderId: this.lastID })
  })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Redo på http://localhost:3000/')
})
