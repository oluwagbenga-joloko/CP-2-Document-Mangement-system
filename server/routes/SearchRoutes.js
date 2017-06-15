import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
import userController from '../controllers/UserController';
import authentication from '../middlewares/Authentication';

const searchRouter = Router();

searchRouter.route('/users/')
.get(authentication.verifyUser, userController.search);
searchRouter.route('/documents/')
.get(authentication.verifyUser, DocumentController.search);
searchRouter.route('/userdocuments/')
.get(authentication.verifyUser, DocumentController.searchUserDocument);
export default searchRouter;

