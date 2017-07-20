import { Document, User } from '../models';

const documentController = {
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
      .then(document => res.status(201).send({ document }))
      .catch(error => res.status(400).send({
        message: error.errors[0].message
      }));
  },
  list(req, res) {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    let accessQuery;
    if (req.decoded.roleId === 1) {
      accessQuery =
      [
        { access: ['public', 'role'] },
      ];
    } else {
      accessQuery =
      [
        { access: 'public', },
        { $and: [
        { access: 'role' },
        { ownerRoleId: req.decoded.roleId }
        ] }
      ];
    }
    return Document
        .findAndCountAll({
          limit: Number(req.query.limit) || null,
          offset: Number(req.query.offset) || null,
          where: {
            $and: [{
              $or: accessQuery,
            },
            ]
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        })
    .then((result) => {
      const pagination = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      res.status(200).send({
        documents: result.rows,
        pagination });
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  retrieve(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          res.status(404).send({
            message: 'document not found'
          });
        } else if (
          (req.decoded.id === 1 &&
           document.access === 'role') ||
          req.decoded.id === document.userId ||
          document.access === 'public' ||
          (
          document.access === 'role' &&
          req.decoded.roleId === document.ownerRoleId
          )
        ) {
          res.status(200).send({ document });
        } else {
          res.status(401).send({
            message: 'unauthorized',
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
        res.status(404).send({ message: 'document not found' });
      } else if (
        req.decoded.id === 1 ||
        req.decoded.id === document.userId
      ) {
        return document
         .destroy()
         .then(() => res.status(200).send({
           message: 'document deleted' }))
         .catch(error => res.status(400).send({ error }));
      } else {
        res.status(401).send({ message: 'unauthorized' });
      }
    })
  .catch(error => res.status(400).send({ error }));
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
        res.status(404).send({ message: 'document not found' });
      } else if (req.decoded.id === document.userId) {
        return document
          .update(DocumentDetails)
          .then(() => res.status(200).send({
            document,
            message: 'document update success'
          }))
          .catch(error => res.status(400).send({
            message: error.errors[0].message
          }));
      } else {
        res.status(401).send({ message: 'unauthorized' });
      }
    })
   .catch(error => res.status(400).send({ error }));
  },
  search(req, res) {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const search = req.query.q || '';
    let accessQuery;
    if (req.query.access === 'public') {
      accessQuery = { access: 'public', };
    } else if (req.decoded.roleId === 1) {
      if (req.query.access === 'role') {
        accessQuery = { access: 'role', };
      } else {
        accessQuery =
        [
        { access: 'public', },
        { access: 'role' },
        ];
      }
    } else if (req.query.access === 'role') {
      accessQuery =
      { $and: [
        { access: 'role' },
        { ownerRoleId: req.decoded.roleId }
      ] };
    } else {
      accessQuery =
      [
        { access: 'public', },
        { $and: [
        { access: 'role' },
        { ownerRoleId: req.decoded.roleId }
        ] }
      ];
    }
    return Document
        .findAndCountAll({
          limit: Number(req.query.limit) || null,
          offset: Number(req.query.offset) || null,
          where: {
            $and: [{
              $or: accessQuery,
            },
            {
              $or: [
                { title: { $ilike: `%${search}%` } },
                { content: { $ilike: `%${search}%` } }
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
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send({ message: 'no documents found ' });
      } else {
        const pagination = {
          totalCount: result.count,
          pageCount: Math.ceil(result.count / limit),
          page: Math.floor(offset / limit) + 1,
          pageSize: result.rows.length
        };
        res.status(200).send({
          documents: result.rows,
          pagination });
      }
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  searchUserDocument(req, res) {
    const id = req.decoded.id;
    const query = req.query.q || '';
    const accessQuery = req.query.access || '';
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    return Document
      .findAndCountAll({
        limit: limit || null,
        offset: offset || null,
        where: {
          userId: id,
          $and: { access: { $ilike: `%${accessQuery}%` } },
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
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send({ message: 'no documents found ' });
      } else {
        const pagination = {
          totalCount: result.count,
          pageCount: Math.ceil(result.count / limit),
          page: Math.floor(offset / limit) + 1,
          pageSize: result.rows.length
        };
        res.status(200).send({

          documents: result.rows,
          pagination,
        });
      }
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
  },
  listUserDocument(req, res) {
    if (req.decoded.id !== Number(req.params.id)) {
      res.status(401).send({ message: 'unauthorized' });
    } else {
      const id = req.params.id;
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      return Document
      .findAndCountAll({
        limit: limit || null,
        offset: offset || null,
        where: {
          userId: id,
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']]
      })
    .then((result) => {
      const pagination = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      res.status(200).send({

        documents: result.rows,
        pagination,
      });
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
    }
  }
};

export default documentController;
