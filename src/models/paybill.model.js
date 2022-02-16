const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const uuid = require('uuid')
//const { tokenTypes } = require('../config/tokens');

const paybillSchema = mongoose.Schema(
  {
    paybillguid: {
      type: String,
      required: true,
      index: true,
      default: uuid.v4,
    },
    userid: {
      type: String,
      required: true,
    },
    billid: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: 'IDR',
      required: true,
    },
    amount: {
      type: Number,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paybillSchema.plugin(toJSON);
paybillSchema.plugin(paginate);

/**
 * @typedef PayBill
 */
const PayBill = mongoose.model('PayBill', paybillSchema);

module.exports = PayBill;
