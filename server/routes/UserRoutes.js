import { Router } from 'express';
import userController from '../controllers/UserController';
import authentication from '../middlewares/Authentication';

const userRouter = Router();

userRouter.route('/')
.post(userController.create)
.get(authentication.verifyUser, authentication.checkAdmin, userController.list);

userRouter.route('/:id')
.put(authentication.verifyUser, userController.update)
.get(authentication.verifyUser, userController.retrieve)
.delete(authentication.verifyUser, userController.delete);

userRouter.route('/login')
.post(userController.login);

userRouter.route('/logout')
.post(userController.logout);

userRouter.route('/:id/documents')
.get(authentication.verifyUser, userController.listUserDocuments);

export default userRouter;
