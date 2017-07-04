/* eslint-disable  import/no-extraneous-dependencies*/
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import log from 'npmlog';
import path from 'path';
import webpack from 'webpack';
import config from './webpack.config.dev';
import roleRouter from './server/routes/roleRoutes';
import userRouter from './server/routes/userRoutes';
import documentRouter from './server/routes/documentRoutes';
import searchRouter from './server/routes/searchRoutes';

const app = express();
const port = process.env.PORT || 7900;
const compiler = webpack(config);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'client/src')));
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/search', searchRouter);
app.get('*', (req, res) => {
  res.status(200).send(
    { message: 'welcome to Document Management System API' });
});
app.listen(port, () => {
  log.info('express app started on port', `${port}`);
});

export default app;

