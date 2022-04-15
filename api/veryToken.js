const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const reqtoken = authHeader.split(" ")[1];
      jwt.verify(reqtoken,  process.env.JWT_TOKEN , (err, user) => {

        if (err) res.status(403).json("Token is not valid!");

      req.user = user;
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = verifyToken