'use strict';

//AICI AM MODIFICAT CU CHAT GPT TOT FOLDER-UL PT CA NU 
//MERGEA PE WINDOWS

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config[env]);
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}

const models = await Promise.all(
  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== 'index.js' &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .map(async file => {
      const module = await import(pathToFileURL(path.join(__dirname, file)));
      return module.default(sequelize, Sequelize.DataTypes);
    })
);

const db = models.reduce((acc, model) => {
  acc[model.name] = model;
  return acc;
}, {});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
