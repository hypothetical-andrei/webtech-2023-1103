import express from 'express'
import bookRouter from './book-router.js'

const app = express()

app.use((req, res, next) => {
  console.log(req.url)
  // res.status(500).json({ message: 'not home now' })
  next()
})

app.use(express.json())

app.locals.books = [{
  id: 1,
  title: 'a',
  content: 'a-content'
}, {
  id: 2,
  title: 'b',
  content: 'b-content'
}, {
  id: 3,
  title: 'c',
  content: 'c-content'
}]

app.use('/', bookRouter)

app.use((err, req, res, next) => {
  console.log('an error occured')
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)