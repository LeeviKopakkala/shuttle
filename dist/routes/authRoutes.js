"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var validator_1 = __importDefault(require("../middlewares/validators/validator"));
var auth_1 = __importDefault(require("../middlewares/authentication/auth"));
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.userController = new userController_1.default();
        this.validator = new validator_1.default();
        this.authMiddleware = new auth_1.default();
        this.router = express_1.Router();
        this.routes();
    }
    AuthRoutes.prototype.routes = function () {
        this.router.post('/signup', this.validator.validateUser, this.userController.registerUser.bind(this.userController));
        this.router.post('/login', this.userController.authenticateUser.bind(this.userController));
        this.router.get('/user', this.authMiddleware.authenticateJWT, this.userController.getUser);
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
