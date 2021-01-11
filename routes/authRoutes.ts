import { Router } from 'express';
import UserController from '../controllers/userController';
import Validator from '../middlewares/validators/validator';
import AuthMiddleware from '../middlewares/authentication/auth';

class AuthRoutes {
  public router: Router;

  public userController: UserController = new UserController();

  public validator: Validator = new Validator();

  public authMiddleware: AuthMiddleware = new AuthMiddleware();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/signup', this.validator.validateUser, this.userController.registerUser.bind(this.userController));

    this.router.post('/login', this.userController.authenticateUser.bind(this.userController));
    this.router.get('/user', this.authMiddleware.authenticateJWT, this.userController.getUser);
  }
}

export default AuthRoutes;
