import express from 'express'

const app = express()

app.locals.books = [{
  id: 1,
  title: 'a',
  content: 'content-a'
}, {
  id: 2,
  title: 'b',
  content: 'content-a'
}, {
  id: 3,
  title: 'c',
  content: 'content-a'
}]

app.get('/books', (req, res) => {
  res.status(200).json(app.locals.books)
})

app.listen(8080)