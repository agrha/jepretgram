const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema ({
  userId:{type: Schema.Types.ObjectId, ref: 'User'},
  imageurl:String,
  description:String,
  love:[{type: Schema.Types.ObjectId, ref: 'User'}],
})

module.exports = mongoose.model('Photo',photoSchema)