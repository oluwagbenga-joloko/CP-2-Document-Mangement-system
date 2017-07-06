import { Router } from 'express';
import documentController from '../controllers/documentController';
import authentication from '../middlewares/authentication';

const DocumentRouter = Router();
/**
 * @swagger
 * definition:
 *   Documents:
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *       roleId:
 *         type: integer
 *       userId:
 *         type: integer
 */
DocumentRouter.route('/')
.all(authentication.verifyUser)
/**
 * @swagger
 * /api/documents:
 *   post:
 *     tags:
 *       - Documents
 *     description: Creates a new documents
 *     summary: Creates a new document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: document
 *         description: documents object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Documents'
 *     responses:
 *       200:
 *         description: Successfully created
 */
.post(documentController.create)
/**
 * @swagger
 * /api/documents:
 *   get:
 *     tags:
 *       - Documents
 *     description: Returns all documents
 *     summary: Gets all documents
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
.get(authentication.verifyUser, documentController.list);
DocumentRouter.route('/:id')
/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     tags:
 *       - Documents
 *     description: Returns a single Documents
 *     summary: Gets a single documents
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Documents's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */

.get(authentication.verifyUser, documentController.retrieve)
/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     tags:
 *       - Documents
 *     description: Deletes a single Documents
 *     summary: Deletes a single documents
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Documents's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
.delete(authentication.verifyUser, documentController.delete)
/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     tags:
 *       - Documents
 *     description: Updates a single Documents
 *     summary: Updates a single document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: document
 *         in: body
 *         description: Fields for the Documents resource
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Documents'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
.put(authentication.verifyUser, documentController.update);


export default DocumentRouter;
