"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var Validator = /** @class */ (function () {
    function Validator() {
        this.validateUser = [
            express_validator_1.body('email').isEmail().withMessage('Check your email'),
            express_validator_1.body('password').isLength({ min: 6 }).withMessage('Password minimum length: 6'),
            express_validator_1.body('name').isLength({ min: 2 }).withMessage('Check your name'),
            this.errorCheck,
        ];
    }
    Validator.prototype.errorCheck = function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        return next();
    };
    return Validator;
}());
exports.default = Validator;
