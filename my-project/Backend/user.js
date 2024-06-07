const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/zcoder")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("fail.connect");
    })

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  profile_image: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  bookmark: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
}]
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
