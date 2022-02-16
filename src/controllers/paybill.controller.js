const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paybillService } = require('../services');

const createPayBill = catchAsync(async (req, res) => {
  const paybill = await paybillService.createPayBill(req.body);
  res.status(httpStatus.CREATED).send(paybill);
});

const getPayBills = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userid', 'billid']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await paybillService.queryPayBills(filter, options);
  res.send(result);
});

const getPayBill = catchAsync(async (req, res) => {
  const paybill = await paybillService.getPayBillById(req.params.Id);
  if (!paybill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pay Bill not found');
  }
  res.send(paybill);
});

const updatePayBill = catchAsync(async (req, res) => {
  const paybill = await paybillService.updatePayBillById(req.params.Id, req.body);
  res.send(paybill);
});

const deletePayBill = catchAsync(async (req, res) => {
  await paybillService.deletePayBillById(req.params.Id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPayBill,
  getPayBills,
  getPayBill,
  updatePayBill,
  deletePayBill,
};
