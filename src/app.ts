import express, { Express } from 'express';
import morgan from 'morgan';
import authRoutes from './infrastructure/routes/auth';
import userRoutes from './infrastructure/routes/user';
import sequelize from './infrastructure/db/config/sequelize';
import { models } from './infrastructure/db/models';

async function runApp() {
  const app: Express = express();

  // * add models
  sequelize.addModels([...models]);

  // * running sequelize connection
  await sequelize
    .sync({ alter: true })
    .then(() => console.log('Inicializando conexión con base de datos'))
    .catch((error) => {
      console.log('Error =>', error);
      console.error('------------ BASE DE DATOS NO EXISTE ----------');
      throw error.message;
    });

  // * config app
  app.use(express.json());
  app.use(morgan('common'));

  // * routes
  app.use(authRoutes);
  app.use(userRoutes);

  return app;
}

export default runApp;
