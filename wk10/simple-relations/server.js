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

app.listen(8080)