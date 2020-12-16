"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.routes();
    }
    ApiRoutes.prototype.routes = function () {
        var _this = this;
        this.router.get('/api', function (req, res) {
            _this.router.use('');
        });
    };
    return ApiRoutes;
}());
exports.default = ApiRoutes;
