const { ForbiddenError } = require("../errors");

const hasRole = (roles) => {
  return (req, res, next) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    throw new ForbiddenError("Ruxast berilmagan!");
  }
  // next();
};
}
module.exports = hasRole;