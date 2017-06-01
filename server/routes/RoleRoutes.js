import { Router } from 'express';
import roleController from '../controllers/RoleController';
import authentication from '../middlewares/Authentication';

const roleRouter = Router();

roleRouter.route('/')
.all(authentication.verifyUser)
.post(authentication.checkAdmin, roleController.create)
.get(authentication.checkAdmin, roleController.list);

roleRouter.route('/:id')
.all(authentication.verifyUser)
.get(authentication.checkAdmin, roleController.retrieve)
.delete(authentication.checkAdmin, roleController.delete)
.put(authentication.checkAdmin, roleController.update);


export default roleRouter;

