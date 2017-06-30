import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

require('dotenv').config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV;
const settings = config[env];
const db = {};

const sequelize = new Sequelize(settings.url, settings);

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
