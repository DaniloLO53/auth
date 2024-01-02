import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'http';
import cors from 'cors';
import routeAdmins from './core/admins/routes';
import { errorController } from './utils/errors';

dotenv.config();

const app = express();
let server: Server;
const PORT = process.env.PORT;

export const validate = (port: number | string | undefined) => {
  if (!port) throw new Error('Port is undefined');
}

const initApi = () => {
  app.use(cors());
  app.use(express.json());

  app.use(routeAdmins);

  app.use(errorController);
}

export const listenApi = () => {
  validate(PORT);
  initApi();

  server = app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
}

export const closeApi = () => {
  if (server) {
    server.close((err) => {
      if (err) {
        console.error(`Error closing server: ${err.message}`);
      } else {
        console.log('Server closed successfully.');
      }
    });
  } else {
    console.warn('Server not initialized or already closed.');
  }
}

listenApi();
