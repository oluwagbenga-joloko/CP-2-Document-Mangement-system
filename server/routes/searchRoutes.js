import { Router } from 'express';
import documentController from '../controllers/documentController';
import userController from '../controllers/userController';
import authentication from '../middlewares/authentication';
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
/**
 * @swagger
 * definition:
 *   Users:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
const searchRouter = Router();
searchRouter.route('/users/')
/**
 * @swagger
 * /api/search/users/?q={searchTerm}$limit={limit}$offset={offset}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns all Users that match the search query
 *     summary: Returns all users that match the search query
 *     parameters:
 *       - name: q
 *         description: search qeury
 *         in: path
 *         required: true
 *       - name: limit
 *         description: limit
 *         in: path
 *         required: false
 *       - name: offset
 *         description: offset
 *         in: path
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Users
 *         schema:
 *           $ref: '#/definitions/Users'
 */
.get(authentication.verifyUser,
authentication.checkAdmin, userController.search);
searchRouter.route('/documents/')
/**
 * @swagger
 * /api/search/documents/?q={query}&limit={limit}&offset={offset}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns all documents excluding private
 *     summary: search for documents created all documents
 *     parameters:
 *       - name: query
 *         description: search qeury
 *         in: path
 *         required: true
 *       - name: limit
 *         description: limit
 *         in: path
 *         required: false
 *       - name: offset
 *         description: offset
 *         in: path
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
.get(authentication.verifyUser, documentController.search);

searchRouter.route('/userdocuments/')
/**
 * @swagger
 * /api/search/mydocuments/?q={query}&limit={limit}&offset={offset}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns all documents created by a user
 *     summary: search for documents created by single user
 *     parameters:
 *       - name: q
 *         description: search qeury
 *         in: path
 *         required: true
 *       - name: limit
 *         description: limit
 *         in: path
 *         required: false
 *       - name: offset
 *         description: offset
 *         in: path
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
.get(authentication.verifyUser, documentController.searchUserDocument);
export default searchRouter;

