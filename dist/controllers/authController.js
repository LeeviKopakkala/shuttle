"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import passport from 'passport';
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.message = 'Signed up';
    }
    AuthController.prototype.signUp = function (req, res) {
        var test = this.message;
        res.status(200).json({ result: test });
    };
    return AuthController;
}());
exports.default = AuthController;
