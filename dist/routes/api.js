"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.routes();
    }
    ApiRoutes.prototype.routes = function () {
        this.router.get('/', function () { return 'Hello World'; });
    };
    return ApiRoutes;
}());
exports.default = ApiRoutes;
