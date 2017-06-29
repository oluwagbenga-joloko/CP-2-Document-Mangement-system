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
        message: error.errors[0].message
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
          res.status(404).send({ success: false, message: 'document not found' });
        } else if (
          req.decoded.id === 1 ||
          req.decoded.id === document.userId ||
          document.access === 'public' ||
          (
          document.access === 'role' &&
          req.decoded.roleId === document.ownerRoleId
          )
        ) {
          res.status(200).send({ success: true, document });
        } else {
          res.status(401).send({ success: false,
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
        res.status(404).send({ success: false, message: 'document not found' });
      } else if (
        req.decoded.id === 1 ||
        req.decoded.id === document.userId
      ) {
        return document
         .destroy()
         .then(() => res.status(200).send({
           success: true,
           message: 'document deleted' }))
         .catch(error => res.status(400).send({ success: false, error }));
      } else {
        res.status(401).send({ success: false, message: 'unauthorized' });
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
        res.status(404).send({ success: false, message: 'document not found' });
      } else if (req.decoded.id === document.userId) {
        return document
          .update(DocumentDetails)
          .then(() => res.status(200).send({
            success: true,
            document,
            message: 'document update success'
          }))
          .catch(error => res.status(400).send({
            success: false,
            message: error.errors[0].message
          }));
      } else {
        res.status(401).send({ success: false, message: 'unauthorized' });
      }
    })
   .catch(error => res.status(400).send({ success: false, error }));
  },
  search(req, res) {
    const offset = Number(req.query.offset),
      limit = Number(req.query.limit),
      search = req.query.q || '';
       // console.log(search);
    // let searchArray = search.match(/[^ ]+/g);
    // searchArray.push(search);
    // console.log(searchArray);
    // searchArray = searchArray.map(item => `%${item}%`);
    // console.log(searchArray);
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
      const metaData = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      res.status(200).send({
        success: true,
        documents: result.rows,
        metaData });
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
      const metaData = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      res.status(200).send({
        success: true,
        documents: result.rows,
        metaData,
      });
    })
    .catch(error => res.status(401).send({ sucess: false, error }));
  }
};
export default DocumentController;
