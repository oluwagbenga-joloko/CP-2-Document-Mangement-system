import { Document } from '../models';

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
      .catch(error => res.status(400).send({ success: false, msg: error.errors[0].message }));
  },
  list(req, res) {
    return Document
    .findAll({
      limit: Number(req.query.limit) || null,
      offset: Number(req.query.offset) || null })
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
          res.status(401).send({ success: false, msg: 'unauthorized', document });
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
         .then(() => res.status(200).send({ success: true, msg: 'document deleted' }))
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
          .then(() => res.status(200).send({ success: true, document, msg: 'document update success' }))
          .catch(error => res.status(400).send({ success: false, msg: error.errors[0].message }));
      } else {
        res.status(401).send({ success: false, msg: 'unauthorized' });
      }
    })
   .catch(error => res.status(400).send({ success: false, error }));
  },
  search(req, res) {
    
    if (req.decoded.roleId === 1) {
      return Document
        .findAll({
          where: {
            $or: [
              { title: { $ilike: `%${req.query.q}%` } },
              { content: { $ilike: `%${req.query.q}%` } }
            ]
          }
        })
    .then(documents => res.status(200).send({ success: true, documents }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  } else {
    console.log(req.decoded.roleId);
    console.log(typeof(req.decoded.roleId));
    return Document
        .findAll({
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
                { title: { $ilike: `%${req.query.q}%` } },
                { content: { $ilike: `%${req.query.q}%` } }
              ]
            }
            ]
          }
        })
    .then(documents => res.status(200).send({ success: true, documents }))
    .catch(error => res.status(401).send({ sucess: false, error }));
  }}
};
export default DocumentController;
