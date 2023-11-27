import express from 'express'
import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storate: 'simple.db'
})

const Student = sequelize.define('student', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

const University = sequelize.define('university', {
  name: Sequelize.STRING
})

University.hasMany(Student)

await sequelize.sync({ alter: true })

const app = express()
app.use(express.json())

app.get('/universities', async (req, res, next) => {
  try {
    const universities = await University.findAll()
    res.status(200).json(universities)
  } catch (error) {
    next(error)
  }
})

app.post('/universities', async (req, res, next) => {
  try {
    const university = await University.create(req.body)
    res.status(201).json(university)
  } catch (error) {
    next(error)
  }
})

app.post('/universities/:uid/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.uid)
    if (university) {
      const student = new Student(req.body)
      student.universityId = university.id
      await student.save()
      res.status(201).json(student)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.get('/universities/:uid/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.uid, { include: [Student] })
    if (university) {
      res.status(200).json(university.students)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'error occured' })
})

app.listen(8080)