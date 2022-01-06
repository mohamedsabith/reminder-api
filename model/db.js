const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/reminders',
  {
    useNewUrlParser: true,
  }
);
//databse error message
mongoose.connection.on("error", err => {
  console.log("err", err)
})
//databse success message
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      userid: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      event:{
          type:Array,
          required: true
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
})

module.exports={
    User
}