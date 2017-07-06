import express from 'express';
import bodyParser from 'body-parser';
import log from 'npmlog';
import path from 'path';
import roleRouter from './server/routes/roleRoutes';
import userRouter from './server/routes/userRoutes';
import documentRouter from './server/routes/documentRoutes';
import searchRouter from './server/routes/searchRoutes';

const pathurl = path.join(__dirname, '/server/routes/*.js');

const app = express();
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'DocumentIT API Endpoints',
    version: '1.0.0',
    description: 'Describing the API Endpoints with Swagger',
  },
  host: 'localhost:7000',
  basePath: '/',
};
// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [pathurl],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/dist')));

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

