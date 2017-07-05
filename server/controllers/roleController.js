import { Role, User } from '../models';

const roleController = {
  create(req, res) {
    return Role
      .create({ title: req.body.title, })
      .then(role => res.status(201).send({ role }))
      .catch(error => res.status(409).send({
        error, message: error.errors[0].message
      }));
  },
  list(req, res) {
    return Role
    .findAll({ include: [{
      model: User,
      as: 'users',
    }] })
    .then(roles => res.status(200).send({ roles }))
    .catch(error => res.status(401).send({ error }));
  },
  retrieve(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          res.status(404).send({ message: 'Role not found' });
        } else {
          res.status(200).send({ role });
        }
      })
      .catch(error => res.status(401).send({ error }));
  },
  delete(req, res) {
    if (Number(req.params.id) === 1) {
      res.status(409).send({
        message: 'Cannot delete Admin role'
      });
    } else if (Number(req.params.id) === 2) {
      res.status(409).send({

        message: 'Cannot delete Regular user role' });
    } else {
      return Role
    .findById(req.params.id)
    .then((role) => {
      if (!role) {
        res.status(404).send({ message: 'Role not found' });
      } else {
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'document deleted successful'
          }));
      }
    })
   .catch(error => res.status(400).send({ error }));
    }
  },
  update(req, res) {
    if (Number(req.params.id) === 1) {
      res.status(409).send({
        message: 'Cannot update Admin role' });
    } else if (Number(req.params.id) === 2) {
      res.status(409).send({

        message: 'Cannot update Regular user role' });
    } else {
      return Role
        .findById(req.params.id)
        .then((role) => {
          if (!role) {
            res.status(404).send({ message: 'Role not found' });
          } else {
            return role
              .update({ title: req.body.title })
              .then(() => res.status(200).send({ role }))
              .catch(error => res.status(409).send({

                error,
                message: error.errors[0].message }));
          }
        })
        .catch(error => res.status(400).send({
          error }));
    }
  }
};
export default roleController;
