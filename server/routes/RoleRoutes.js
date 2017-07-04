import { Router } from 'express';
import roleController from '../controllers/roleController';
import authentication from '../middlewares/authentication';

const roleRouter = Router();

 /**
   * @swagger
   * definition:
   *   Roles:
   *    properties:
   *      title:
   *        type: string
   */

roleRouter.route('/')
.all(authentication.verifyUser)
 /**
   * @swagger
   * /api/roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Create a New Role
   *     summary: Create a New Role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: Role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Roles'
   *     responses:
   *       201:
   *         description: Successfully created
   *       409:
   *         description: Role cannot be created
   */
.post(authentication.checkAdmin, roleController.create)
/**
   * @swagger
   * /api/roles:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns all roles
   *     summary: Returns all roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   */
.get(authentication.checkAdmin, roleController.list);

roleRouter.route('/:id')
.all(authentication.verifyUser)
/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     description: Returns a single role
 *     summary: Returns a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: role id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A role puppy
 *         schema:
 *           $ref: '#/definitions/Roles'
 */
.get(authentication.checkAdmin, roleController.retrieve)
/**
   * @swagger
   * /api/roles/{id}:
   *   delete:
   *     tags:
   *       - Roles
   *     description: deletes a single role
   *     summary: Delete a single role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: role id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   */

.delete(authentication.checkAdmin, roleController.delete)
/**
   * @swagger
   * /api/roles/{id}:
   *   put:
   *     tags:
   *       - Roles
   *     description: updates a single role
   *     summary: Updates a single role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: new role title
   *         in: body
   *         required: true
   *         type: object
   *     responses:
   *       200:
   *         description: Successfully deleted
   */


.put(authentication.checkAdmin, roleController.update);


export default roleRouter;
