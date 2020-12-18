import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import Validator from '../middlewares/validators/validator';

class AuthRoutes {
  public router: Router;

  public authController: AuthController = new AuthController();

  public userController: UserController = new UserController();

  public validator: Validator = new Validator();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/signup', this.validator.validateUser, this.userController.registerUser.bind(this.userController));

    // this.router.post('/login', this.userController.authenticateUser);
  }
}

export default AuthRoutes;
