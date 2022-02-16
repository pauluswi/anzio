const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPayBill = {
  body: Joi.object().keys({
    userid: Joi.string().required(),
    billid: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const getPayBills = {
  query: Joi.object().keys({
    userid: Joi.string(),
    billid: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPayBill = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updatePayBill = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userid: Joi.string(),
      billid: Joi.string(),
      currency: Joi.string(),
      amount: Joi.number(),
    })
    .min(1),
};

const deletePayBill = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayBill,
  getPayBills,
  getPayBill,
  updatePayBill,
  deletePayBill,
};
