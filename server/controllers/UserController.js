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
            roleId: 2,
            id: user.id
          }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
            res.status(201).send({
              success: true,
              token,
              message: 'user created succesfully',
            });
          });
        } else {
          res.status(409).send({
            success: false,
            message: 'user email already used'
          });
        }
      })
      .catch(error => res.status(400).send({
        success: false,
        error,
        message: error.errors[0].message
      }));
  },
  list(req, res) {
    return User
    .findAndCountAll({
      limit: Number(req.query.limit) || null,
      offset: Number(req.query.offset) || null,
      include: [{
        model: Role
      }]
    })
    .then(result => res.status(200).send({
      success: true,
      users: result.rows,
      count: result.count
    }))
    .catch(error => res.status(401).send({ success: false, error }));
  },
  retrieve(req, res) {
    if (req.decoded.id === 1 || req.decoded.id === Number(req.params.id)) {
      return User
      .findById(req.params.id, {
        attributes: { exclude: ['password'] },
        include: {
          model: Role,
          attributes: ['title']
        }
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ success: false, message: 'user not found' });
        } else {
          res.status(200).send({ success: true, user });
        }
      })
      .catch(error => res.status(401).send({ success: false, error }));
    }
    res.status(401).send({ success: false, message: 'unauthorized' });
  },
  delete(req, res) {
    if (req.decoded.id === 1 || req.decoded.id === Number(req.params.id)) {
      if (Number(req.params.id) === 1) {
        res.status(403).send({
          success: false,
          message: 'cannot delete admin profile'
        });
      } else {
        return User
        .findById(req.params.id)
        .then((user) => {
          if (user) {
            user.destroy()
             .then(() => res.status(200).send({ success: true }))
             .catch(error => res.status(400).send({ success: false, error }));
          } else {
            res.status(404).send({ success: false, message: 'user not found' });
          }
        })
   .catch(error => res.status(400).send({ success: false, error }));
      }
    } else {
      console.log('in user');
      res.status(401).send({ success: false, message: 'unauthorized' });
    }
  },
  update(req, res) {
    if (req.decoded.id === Number(req.params.id)) {
      let hooks;
      let userDetails;
      if (req.body.password !== '') {
        userDetails = {
          firstName: req.body.firstName,
          email: req.body.email,
          lastName: req.body.lastName,
          password: req.body.password,
        };
        hooks = true;
      } else {
        userDetails = {
          firstName: req.body.firstName,
          email: req.body.email,
          lastName: req.body.lastName
        };
        hooks = false;
      }
      return User
        .findById(req.params.id)
        .then(user => user
          .update(userDetails, {
            hooks,
          })
          .then(() => res.status(200).send({
            success: true,
            message: 'profile update success' }))
          .catch(error => res.status(400).send({ success: false,
            error,
            message: error.errors[0].message
          })))
        .catch(error => res.status(400).send({ success: false,
          error,
          message: error.errors[0].message }));
    } else if (req.decoded.id === 1) {
      return User
        .findById(req.params.id)
        .then((user) => {
          if (!user) {
            res.status(404).send({ success: false, message: 'user not found' });
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
                    message: 'cannot make user admin'
                  });
                }
              } else {
                res.status(404).send({
                  success: false,
                  message: 'role not does not exist'
                });
              }
            })
            .catch(error => res.status(400).send({ success: false, error }));
          }
        })
        .catch(error => res.status(400).send({ success: false, error }));
    }
    res.status(401).send({ success: false, message: 'unauthorized' });
  },
  login(req, res) {
    if (req.body.password && req.body.email) {
      return User
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            res.status(404).send({ success: false, message: 'email not found' });
          } else {
            user.verifyPassword(req.body.password)
              .then((validPassword) => {
                if (!validPassword) {
                  res.status(404).send({
                    success: false,
                    message: 'invalid password' });
                } else {
                  jwt.sign({
                    roleId: user.roleId,
                    id: user.id
                  }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
                    res.send({
                      success: true,
                      message: 'login succesful',
                      token
                    });
                  });
                }
              });
          }
        })
      .catch(error => res.status(400).send(error));
    }
    res.status(400).send({
      success: false, message: 'email and password required' });
  },
  search(req, res) {
    const limit = Number(req.query.limit) || null,
      offset = Number(req.query.offset) || null;
    return User
    .findAndCountAll({
      limit,
      offset,
      where: {
        $or: [
          { firstName: { $ilike: `%${req.query.q}%` } },
          { lastName: { $ilike: `%${req.query.q}%` } },
          { email: { $ilike: `%${req.query.q}%` } }
        ]
      },
      include: {
        model: Role,
        attributes: ['title']
      },
      order: [['updatedAt', 'DESC']]
    })
    .then((result) => {
      const metaData = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      res.status(200).send({ success: true,
        users: result.rows,
        metaData
      })
;
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
  },

  logout(req, res) {
    res.status(200).send({ success: true, message: 'log out successful' });
  }
};
export default userController;
