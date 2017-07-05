import jwt from 'jsonwebtoken';

require('dotenv').config();

const authentication = {
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token']
    || req.headers.authorization || null;
    if (!token) {
      res.status(401).send({
        success: false,
        message: 'No token provided'
      });
    } else {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ success: false, message: 'invalid token' });
        }
        if (decoded) {
          req.decoded = decoded;
          next();
        }
      });
    }
  },
  checkAdmin(req, res, next) {
    if (req.decoded.roleId === 1) {
      next();
    } else {
      res.status(401).send({ success: false, message: 'unauthorized' });
    }
  }

};
export default authentication;
