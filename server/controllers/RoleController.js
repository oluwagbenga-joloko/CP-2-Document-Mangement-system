import { Role, User } from '../models';

const roleController = {
  create(req, res) {
    return Role
      .create({ title: req.body.title, })
      .then(role => res.status(201).send({ success: true, role }))
      .catch(error => res.status(409).send({
        success: false, error, msg: error.errors[0].message
      }));
  },
  list(req, res) {
    return Role
    .findAll({ include: [{
      model: User,
      as: 'users',
    }] })
    .then(roles => res.status(200).send({ success: true, roles }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  retrieve(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          res.status(404).send({ success: false, msg: 'Role not found' });
        } else {
          res.status(200).send({ success: true, role });
        }
      })
      .catch(error => res.status(401).send({ sucess: false, error }));
  },
  delete(req, res) {
    if (Number(req.params.id) === 1) {
      res.status(409).send({ success: false, msg: 'Cannot delete Admin role' });
    } else if (Number(req.params.id) === 2) {
      res.status(409).send({
        success: false,
        msg: 'Cannot delete Regular user role' });
    } else {
      return Role
    .findById(req.params.id)
    .then((role) => {
      if (!role) {
        res.status(404).send({ success: false, msg: 'Role not found' });
      } else {
        return role
          .destroy()
          .then(() => res.status(200).send({ success: true }))
          .catch(error => res.status(400).send({ success: false, error }));
      }
    })
   .catch(error => res.status(400).send({ success: false, error }));
    }
  },
  update(req, res) {
    if (Number(req.params.id) === 1) {
      res.status(409).send({ success: false, msg: 'Cannot update Admin role' });
    } else if (Number(req.params.id) === 2) {
      res.status(409).send({
        success: false,
        msg: 'Cannot update Regular user role' });
    } else {
      return Role
        .findById(req.params.id)
        .then((role) => {
          if (!role) {
            res.status(404).send({ success: false, msg: 'Role not found' });
          } else {
            return role
              .update({ title: req.body.title })
              .then(() => res.status(200).send({ success: true, role }))
              .catch(error => res.status(409).send({
                success: false,
                error,
                msg: error.errors[0].message }));
          }
        })
        .catch(error => res.status(400).send({
          success: false,
          error,
          msg: error.errors[0].message }));
    }
  }

};
export default roleController;
