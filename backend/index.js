const express = require('express'),
  path = require('path')
const sqlite3 = require('sqlite3').verbose()

const app = express()

const db = new sqlite3.Database(path.resolve(__dirname, "database/sparklesDB.sqlite"))

app.get('/products', (_req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send('Database error')
      return
    }
    res.json(rows)
  })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Redo på http://localhost:3000/')
})
