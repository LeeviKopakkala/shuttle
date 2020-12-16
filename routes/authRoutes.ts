import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';

class AuthRoutes {
  public router: Router;

  public authController: AuthController = new AuthController();

  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/signup', this.userController.registerUser.bind(this.userController));
  }
}

export default AuthRoutes;
