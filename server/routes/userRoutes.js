import { Router } from 'express';
import userController from '../controllers/userController';
import documentController from '../controllers/documentController';
import authentication from '../middlewares/authentication';

const userRouter = Router();
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
userRouter.route('/')
/**
 * @swagger
 * /api/Users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new User
 *     summary: create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: cannot create user
 */
.post(userController.create)
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     summary: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Users
 *         schema:
 *           $ref: '#/definitions/Users'
 */
.get(authentication.verifyUser, authentication.checkAdmin, userController.list);

userRouter.route('/:id')
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single User
 *     summary: updates a single User
 *     produces: application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         type: object
 *         in: path
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
.put(authentication.verifyUser, userController.update)
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single User
 *     summary: Returns a single User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single User
 *         schema:
 *           $ref: '#/definitions/Users'
 */
.get(authentication.verifyUser, userController.retrieve)
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single User
 *     summary: Deletes a single User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
.delete(authentication.verifyUser, userController.delete);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     description: logs a user in and Returns a token;
 *     summary: logs a user in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: user email
 *         in: body
 *         required: true
 *       - name: password
 *         description: user password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: login Successful
 */
userRouter.route('/login')
.post(userController.login);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     tags:
 *       - Users
 *     description: Logs a user out
 *     summary: Logs out a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: logout Successful
 *         schema:
 *           $ref: '#/definitions/Users'
 */
userRouter.route('/logout')
.post(userController.logout);
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     summary: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Users
 *         schema:
 *           $ref: '#/definitions/Users'
 */

userRouter.route('/:id/documents')
/**
 * @swagger
 * /api/users/:id/documents:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all documents
 *     summary: Gets all documents from a single user documents
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
.get(authentication.verifyUser, documentController.listUserDocument);

export default userRouter;
