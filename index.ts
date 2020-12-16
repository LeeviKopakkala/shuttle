/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import AuthRoutes from './routes/authRoutes';

class Shuttle {
    public app: express.Application;

    constructor() {
      this.app = express();
      this.config();
      this.routes();
    }

    public config() {
      this.app.set('port', process.env.port || 3000);
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(compression());
      this.app.use(cors());
    }

    public routes() {
      this.app.use('/auth', new AuthRoutes().router);
    }

    public start() {
      const port = this.app.get('port');
      this.app.listen(port, () => {
        console.log(`App listening on PORT ${port}`);
      });
    }
}

const server = new Shuttle();

server.start();
