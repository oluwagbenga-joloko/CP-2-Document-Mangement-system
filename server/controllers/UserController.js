import jwt from 'jsonwebtoken';
import { User, Document, Role } from '../models';

require('dotenv').config();

const userController = {
  create(req, res) {
    const userDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      roleId: 2
    };
    return User
      .findOrCreate({ where: { email: req.body.email }, defaults: userDetails })
      .spread((user, created) => {
        if (created) {
          jwt.sign({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: 2,
            id: user.id
          }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
            res.status(201).send({
              success: true,
              user,
              token,
              msg: 'user created succesfully',
            });
          });
        } else {
          res.status(409).send({
            success: false,
            msg: 'user email already used'
          });
        }
      })
      .catch(error => res.status(400).send({
        success: false,
        error,
        msg: error.errors[0].message
      }));
  },
  list(req, res) {
    return User
    .findAndCountAll({
      limit: Number(req.query.limit) || null,
      offset: Number(req.query.offset) || null,
      include: [{
        model: Document,
        as: 'Documents',
      }]
    })
    .then(result => res.status(200).send({ success: true, users: result.rows, count: result.count }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  retrieve(req, res) {
    if (req.decoded.id === 1 || req.decoded.id === Number(req.params.id)) {
      return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ success: false, msg: 'user not found' });
        } else {
          res.status(200).send({ success: true, user });
        }
      })
      .catch(error => res.status(401).send({ sucess: false, error }));
    }
    res.status(401).send({ success: false, msg: 'unauthorized' });
  },
  delete(req, res) {
    if (req.decoded.id === 1 || req.decoded.id === Number(req.params.id)) {
      if (Number(req.params.id) === 1) {
        res.status(403).send({ success: false, msg: 'cannot delete admin profile' });
      } else {
        return User
        .findById(req.params.id)
        .then((user) => {
          if (user) {
            user.destroy()
             .then(() => res.status(200).send({ success: true }))
             .catch(error => res.status(400).send({ success: false, error }));
          } else {
            res.status(404).send({ success: false, msg: 'user not found' });
          }
        })
   .catch(error => res.status(400).send({ success: false, error }));
      }
    } else {
      res.status(401).send({ success: false, msg: 'unauthorized' });
    }
  },
  update(req, res) {
    if (req.decoded.id === Number(req.params.id)) {
      let userDetails;
      if (req.body.password) {
        userDetails = {
          firstName: req.body.firstName,
          email: req.body.email,
          lastName: req.body.lastName,
          password: req.body.password,
        };
      } else {
        userDetails = {
          firstName: req.body.firstName,
          email: req.body.email,
          lastName: req.body.lastName
        };
      }
      return User
        .findById(req.params.id)
        .then(user => user
          .update(userDetails)
          .then(() => res.status(200).send({
            success: true,
            user,
            msg: 'profile update success' }))
          .catch(error => res.status(400).send({ success: false,
            error,
            msg: error.errors[0].message
          })))
        .catch(error => res.status(400).send({ success: false,
          error,
          msg: error.errors[0].message }));
    } else if (req.decoded.id === 1) {
      return User
        .findById(req.params.id)
        .then((user) => {
          if (!user) {
            res.status(404).send({ success: false, msg: 'user not found' });
          } else {
            return Role
            .findById(req.body.roleId)
            .then((role) => {
              if (role) {
                if (role.id !== 1) {
                  user.update({ roleId: role.id })
                   .then(() => res.status(200).send({ success: true, user }))
                   .catch(error => res.status(400).send({ success: false,
                     error
                   }));
                } else {
                  res.status(409).send({
                    success: false,
                    msg: 'cannot make user admin'
                  });
                }
              } else {
                res.status(404).send({
                  success: false,
                  msg: 'role not does not exist'
                });
              }
            })
            .catch(error => res.status(400).send({ success: false, error }));
          }
        })
        .catch(error => res.status(400).send({ success: false, error }));
    }
    res.status(401).send({ success: false, msg: 'unauthorized' });
  },
  listUserDocuments(req, res) {
    return User
      .findById(req.params.id,
      { include: [{
        model: Document,
        as: 'Documents',
      }] })
      .then(user => res.status(200).send({
        success: true,
        documents: user.Documents
      }))
      .catch(error => res.status(401).send({ sucess: false, error }));
  },
  login(req, res) {
    if (req.body.password && req.body.email) {
      return User
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            res.status(404).send({ success: false, msg: 'email not found' });
          } else {
            user.verifyPassword(req.body.password)
              .then((validPassword) => {
                if (!validPassword) {
                  res.status(404).send({
                    success: false,
                    msg: 'invalid password' });
                } else {
                  jwt.sign({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    roleId: user.roleId,
                    id: user.id
                  }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
                    res.send({ success: true, msg: 'login succesful', token, user });
                  });
                }
              });
          }
        })
      .catch(error => res.status(400).send(error));
    }
    res.send({ succes: false, msg: 'email and password required' });
  },
  search(req, res) {
    return User
    .findAndCountAll({
      limit: Number(req.query.limit) || null,
      offset: Number(req.query.offset) || null,
      where: {
        $or: [
          { firstName: { $ilike: `%${req.query.q}%` } },
          { lastName: { $ilike: `%${req.query.q}%` } },
          { email: { $ilike: `%${req.query.q}%` } }
        ]
      }
    })
    .then(result => res.status(200).send({ success: true,
      users: result.rows,
      count: result.count,
      result
    }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  },

  logout(req, res) {
    res.send({ success: false });
  }
};
export default userController;
