import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import log from 'npmlog';
import roleRouter from './server/routes/RoleRoutes';
import userRouter from './server/routes/UserRoutes';
import documentRouter from './server/routes/DocumentRoutes';
import searchRouter from './server/routes/SearchRoutes';

const app = express();
const port = process.env.Port || 4000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/search', searchRouter);
app.get('*', (req, res) => {
  res.status(200).send(
    { message: 'welcome to Document Management System API' });
});
app.listen(port, () => log.info('express app started on port', `${port}`));

export default app;

