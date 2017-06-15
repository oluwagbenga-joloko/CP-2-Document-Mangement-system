import { Document, User } from '../models';

const DocumentController = {
  create(req, res) {
    const DocumentDetails = {
      userId: req.decoded.id,
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      ownerRoleId: req.decoded.roleId,
    };
    return Document
      .create(DocumentDetails)
      .then(document => res.status(201).send({ success: true, document }))
      .catch(error => res.status(400).send({
        success: false,
        msg: error.errors[0].message
      }));
  },
  list(req, res) {
    return Document
    .findAll({
      include: {
        model: User
      }
    })
    .then(documents => res.status(200).send({ success: true, documents }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  retrieve(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          res.status(404).send({ success: false, msg: 'document not found' });
        } else if (
          req.decoded.id === 1 ||
          req.decoded.id === document.userId ||
          document.access === 'public' ||
          (
          document.access === 'role' &&
          req.decoded.roleId === document.ownerRoleID
          )
        ) {
          res.status(200).send({ success: true, document });
        } else {
          res.status(401).send({ success: false,
            msg: 'unauthorized',
            document });
        }
      })
      .catch(error => res.status(401).send({ sucess: false, error }));
  },
  delete(req, res) {
    return Document
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        res.status(404).send({ success: false, msg: 'document not found' });
      } else if (
        req.decoded.id === 1 ||
        req.decoded.id === document.userId
      ) {
        return document
         .destroy()
         .then(() => res.status(200).send({
           success: true,
           msg: 'document deleted' }))
         .catch(error => res.status(400).send({ success: false, error }));
      } else {
        res.status(401).send({ success: false, msg: 'unauthorized' });
      }
    })
  .catch(error => res.status(400).send({ success: false, error }));
  },
  update(req, res) {
    const DocumentDetails = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
    };
    return Document
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        res.status(404).send({ success: false, msg: 'document not found' });
      } else if (req.decoded.id === document.userId) {
        return document
          .update(DocumentDetails)
          .then(() => res.status(200).send({
            success: true,
            document,
            msg: 'document update success'
          }))
          .catch(error => res.status(400).send({
            success: false,
            msg: error.errors[0].message
          }));
      } else {
        res.status(401).send({ success: false, msg: 'unauthorized' });
      }
    })
   .catch(error => res.status(400).send({ success: false, error }));
  },
  search(req, res) {
    const query = req.query.q || '';
    if (req.decoded.roleId === 1) {
      return Document
        .findAndCountAll({
          limit: Number(req.query.limit) || null,
          offset: Number(req.query.offset) || null,
          where: {
            $or: [
              { title: { $ilike: `%${query}%` } },
              { content: { $ilike: `%${query}%` } }
            ]
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        })
    .then(result => res.status(200).send({
      success: true,
      documents: result.rows,
      count: result.count }))
    .catch(error => res.status(401).send({ sucess: false, error }));
    }
    return Document
        .findAndCountAll({
          limit: Number(req.query.limit) || null,
          offset: Number(req.query.offset) || null,
          where: {
            $and: [{
              $or: [
                { access: 'public', },
                { $and: [
                  { access: 'role' },
                  { ownerRoleId: req.decoded.roleId }
                ] },
              ],
            },
            {
              $or: [
                { title: { $ilike: `%${query}%` } },
                { content: { $ilike: `%${query}%` } }
              ]
            }
            ]
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        })
    .then(result => res.status(200).send({
      success: true,
      documents: result.rows,
      count: result.count }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  searchUserDocument(req, res) {
    const id = req.decoded.id;
    const query = req.query.q;
    return Document
      .findAndCountAll({
        limit: Number(req.query.limit) || null,
        offset: Number(req.query.offset) || null,
        where: {
          userId: id,
          $or: [
            { title: { $ilike: `%${query}%` } },
            { content: { $ilike: `%${query}%` } }
          ]
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']]
      })
    .then(result => res.status(200).send({
      success: true,
      documents: result.rows,
      count: result.count }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  }
};
export default DocumentController;
