import express from 'express'

const router = express.Router()

// get /books
// get /books?sortField=title&sortOrder=1
// http://localhost:8080/books?sortField=content&sortOrder=-1
router.get('/books', (req, res, next) => {
  let { sortField, sortOrder } = req.query
  if (sortField) {
    sortOrder = parseInt(sortOrder)
    const bookComparator = (a, b) => {
      if (a[sortField] < b[sortField]) {
        return -1 * sortOrder
      } else {
        if (a[sortField] > b[sortField]) {
          return 1 * sortOrder
        } else {
          return 0
        }
      }
    }
    res.status(200).json(res.app.locals.books.sort(bookComparator))
  } else {
    res.status(200).json(res.app.locals.books)
  }
})

router.post('/books', (req, res, next) => {
  const book = req.body
  try {
    if (book && book.id) {
      const existing = res.app.locals.books.find(e => e.id === book.id)
      if (existing) {
        // res.status(400).json({ message: 'cannot add existing book' })
        throw new Error('duplicate book id')
      } else {
        res.app.locals.books.push(book)
        res.status(201).json({ message: 'created book' })
      }
    } else {
      res.status(400).json({ message: 'invalid request' })
    }    
  } catch (error) {
    next(error)
  }
})

// get http://localhost:8080/books/1
router.get('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const index = res.app.locals.books.findIndex(e => e.id === id)
  if (index === -1) {
    res.status(404).json({ message: 'not found' })
  } else {
    res.status(200).json(res.app.locals.books[index])
  }
})

router.put('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const index = res.app.locals.books.findIndex(e => e.id === id)
  if (index === -1) {
    res.status(404).json({ message: 'not found' })
  } else {
    res.app.locals.books[index].title = req.body.title
    res.app.locals.books[index].content = req.body.content
    res.status(202).json({ message: 'book modified' })
  }
})

router.delete('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const index = res.app.locals.books.findIndex(e => e.id === id)
  if (index === -1) {
    res.status(404).json({ message: 'not found' })
  } else {
    res.app.locals.books.splice(index, 1)
    res.status(204).json({ message: 'book deleted' })
  }
})

export default router