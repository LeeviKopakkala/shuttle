"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = __importDefault(require("../controllers/authController"));
var userController_1 = __importDefault(require("../controllers/userController"));
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.authController = new authController_1.default();
        this.userController = new userController_1.default();
        this.router = express_1.Router();
        this.routes();
    }
    AuthRoutes.prototype.routes = function () {
        this.router.post('/signup', this.userController.registerUser.bind(this.userController));
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
