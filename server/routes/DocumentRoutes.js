import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
import authentication from '../middlewares/Authentication';

const DocumentRouter = Router();

DocumentRouter.route('/')
.all(authentication.verifyUser)
.post(DocumentController.create)
.get(authentication.checkAdmin, DocumentController.list);

DocumentRouter.route('/:id')
.get(authentication.verifyUser, DocumentController.retrieve)
.delete(authentication.verifyUser, DocumentController.delete)
.put(authentication.verifyUser, DocumentController.update);


export default DocumentRouter;
