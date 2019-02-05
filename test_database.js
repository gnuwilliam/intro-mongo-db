const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/testdb')
}

const student = new mongoose.Schema({
  firstName: String
})

const Student = new mongoose.model('student', student)

connect()
  .then(async connection => {
    const student = await Student.create({firstName: 'William Oliveira'})
    console.log(student)
  })
  .catch(e => console.error(e))