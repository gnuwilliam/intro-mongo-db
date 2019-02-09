const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true})
}

const student = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'school'
  }
}, {timestamps: true})

const school = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: Number,
  staff: Array
})

const School = new mongoose.model('school', school)
const Student = new mongoose.model('student', student)

connect()
  .then(async connection => {
    const school = await School.create({
      name: 'My School',
      students: 500,
      staff: ['Dog', 'Cat', 'Find me']
    })
    const school2 = await School.create({
      name: 'Other School',
      students: 1000,
      staff: ['Will', 'Someone', 'Find me']
    })

    const student = await Student.create({
      firstName: 'Josh', lastName: 'Finder', school: school._id
    })

    const match = await School.find({
      staff: {$in: ['Will']}
    })
    console.log(match)
  })
  .catch(e => console.error(e))