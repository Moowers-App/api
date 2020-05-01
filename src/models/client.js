const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Schema = mongoose.Schema

const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

clientSchema.methods.generateAuthToken = async () => {
  const token = jwt.sign({ _id: this._id, name: this.name, role: "client" }, process.env.JWT_PRIVATE_KEY)
  return token
}

const Client = mongoose.model('Client', clientSchema)

module.exports = Client