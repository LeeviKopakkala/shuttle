"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var Shuttle = /** @class */ (function () {
    function Shuttle() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Shuttle.prototype.config = function () {
        this.app.set('port', process.env.port || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    };
    Shuttle.prototype.routes = function () {
        this.app.use('/auth', new authRoutes_1.default().router);
    };
    Shuttle.prototype.start = function () {
        var port = this.app.get('port');
        this.app.listen(port, function () {
            console.log("App listening on PORT " + port);
        });
    };
    return Shuttle;
}());
var server = new Shuttle();
server.start();
