const allRoles = {
  user: ['getUsers', 'manageUsers', 'getPayBills', 'managePayBills'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
