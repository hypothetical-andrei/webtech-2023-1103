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

const Course = sequelize.define('course', {
  name: Sequelize.STRING
})

University.hasMany(Student)
University.hasMany(Course)

Course.belongsToMany(Student, { through: 'enrollments' })
Student.belongsToMany(Course, { through: 'enrollments' } )

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

app.get('/universities/:uid/students/:sid', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.uid, {
      include: {
        model: Student,
        where: {
          id: req.params.sid
        }
      }
    })
    if (university) {
      const student = university.students.shift()
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: 'not found' })

      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.put('/universities/:uid/students/:sid', async (req, res, next) => {
  try {
    const results = await Student.update(req.body, {
      where: {
        id: req.params.sid,
        universityId: req.params.uid
      },
      fields: ['name', 'email']
    })
    console.warn(results)
    if (results.shift()) {
        res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/universities/:uid/students/:sid', async (req, res, next) => {
  try {
    const results = await Student.destroy({
      where: {
        id: req.params.sid,
        universityId: req.params.uid
      }
    })
    if (results) {
        res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.post('/universities/:uid/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.uid)
    if (university) {
      const course = new Course(req.body)
      course.universityId = university.id
      await course.save()
      res.status(201).json(course)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.get('/universities/:uid/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.uid, { include: [Course] })
    if (university) {
      res.status(200).json(university.courses)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.post('/courses/:cid/enrollments', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.cid)
    const student = await Student.findByPk(req.body.sid)
    if (course && student) {
      await course.addStudent(student)
      res.status(201).json({ message: 'enrolled' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.post('/students/:sid/enrollments', async (req, res, next) => {})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'error occured' })
})

app.listen(8080)