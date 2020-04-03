const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  }
},
{
  versionKey: false
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;