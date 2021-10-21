const mongoose = require('mongoose')

let voucherSchema = mongoose.Schema({

  name: {
    type: String,
    require: [true, 'Nama game harus diisi']
  },

  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },

  nominals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal'
  }],
  
  thumbnial: {
    type: String
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

module.exports = mongoose.model('Voucher', voucherSchema)