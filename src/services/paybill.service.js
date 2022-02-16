const httpStatus = require('http-status');
const { PayBill } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} paybillBody
 * @returns {Promise<PayBill>}
 */
const createPayBill = async (paybillBody) => {
  return PayBill.create(paybillBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPayBills = async (filter, options) => {
  const paybills = await PayBill.paginate(filter, options);
  return paybills;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<PayBill>}
 */
const getPayBillById = async (id) => {
  return PayBill.findById(id);
};

/**
 * Get paybill by userid
 * @param {string} userid
 * @returns {Promise<PayBill>}
 */
const getPayBillByUserId = async (userid) => {
  return PayBill.findOne({ userid });
};

/**
 * Update user by id
 * @param {ObjectId} Id
 * @param {Object} updateBody
 * @returns {Promise<PayBill>}
 */
const updatePayBillById = async (Id, updateBody) => {
  const paybill = await getPayBillById(Id);
  if (!paybill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Paybill not found');
  }
  Object.assign(paybill, updateBody);
  await paybill.save();
  return paybill;
};

/**
 * Delete paybill by id
 * @param {ObjectId} Id
 * @returns {Promise<PayBill>}
 */
const deletePayBillById = async (Id) => {
  const paybill = await getPayBillById(Id);
  if (!paybill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Paybill not found');
  }
  await paybill.remove();
  return paybill;
};

module.exports = {
  createPayBill,
  queryPayBills,
  getPayBillById,
  getPayBillByUserId,
  updatePayBillById,
  deletePayBillById,
};
