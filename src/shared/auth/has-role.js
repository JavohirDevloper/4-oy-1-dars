const { ForbiddenError } = require("../errors");

const hasRole = ({ req, res, next }, roles) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    throw new ForbiddenError("Ushbu yo'ldan kirish taqiqlangan!");
  }
};

module.exports = hasRole;