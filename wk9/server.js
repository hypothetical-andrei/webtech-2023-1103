import express from 'express'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'my.db'
})

const Employee = sequelize.define('employee', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: [5, 100]
    }
  },
  role: Sequelize.STRING,
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1000
    }
  }
})

await sequelize.sync({ alter: true })

const app = express()

app.use(express.json())

// get /employees?filter=a
// get /employees?simplified=yes
// get /employees?filterField=name&filterValue=j
app.get('/employees', async (req, res, next) => {
  try {
    const query = {}
    if (req.query.filterField && req.query.filterValue) {
      query.where = {
        [req.query.filterField]: {
          [Op.like]: `%${req.query.filterValue}%`
          // [Op.regexp]: new RegExp(`.*${req.query.filterValue}.*`)
        }
      }
    }
    if (req.query.simplified === 'yes') {
      query.attributes = ['name', 'salary']
    }
    const employees = await Employee.findAll(query)
    res.status(200).json(employees)
  } catch (error) {
    next(error)
  }
})

app.post('/employees', async (req, res, next) => {
  try {
    const employee = req.body
    const savedEmployee = await Employee.create(employee)
    res.status(201).json(savedEmployee)
  } catch (error) {
    next(error)
  }
})

app.get('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      res.status(200).json(employee)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.put('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      await employee.update(req.body, {
        fields: ['role', 'name', 'salary']
      })
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      await employee.destroy()
      res.status(204).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'could not do it' })
})

app.listen(8080)