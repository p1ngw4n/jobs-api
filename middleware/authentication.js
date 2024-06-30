const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    console.log('hey');
  const authHeader = req.headers.authorization;
  console.log('hey');
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  console.log('kom k hier');
  console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user on the jobroute
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;