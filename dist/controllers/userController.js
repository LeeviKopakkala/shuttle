"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt_1 = __importDefault(require("bcrypt"));
// import passport from 'passport';
// import LocalStrategy from 'passport-local';
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("../configs/config"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Register user and return user object
     * @param req: Http request
     * @param res; Http response
     */
    UserController.prototype.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, existingUser, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            email: req.body.email,
                            name: req.body.name,
                            username: req.body.username,
                        };
                        hashedPassword = bcrypt_1.default.hashSync(req.body.password, bcrypt_1.default.genSaltSync(10));
                        return [4 /*yield*/, this.findUserByEmail(user.email)];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser) return [3 /*break*/, 2];
                        res.status(400).json({ error: 'User already exists' });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.prisma.user.create({
                            data: {
                                name: user.name,
                                email: user.email,
                                username: user.username,
                                password: hashedPassword,
                            },
                        })];
                    case 3:
                        newUser = _a.sent();
                        res.status(201).json({
                            email: newUser.email,
                            name: newUser.name,
                            createdAt: newUser.createdAt,
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.authenticateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return __generator(this, function (_a) {
                user = {
                    email: req.body.email,
                    password: req.body.password,
                };
                this.findUserByEmail(user.email).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var isCorrectPassword, email, token, response;
                    return __generator(this, function (_a) {
                        if (result) {
                            isCorrectPassword = bcrypt_1.default.compareSync(user.password, result === null || result === void 0 ? void 0 : result.password);
                            console.log(isCorrectPassword);
                            if (isCorrectPassword === true) {
                                email = result === null || result === void 0 ? void 0 : result.email;
                                token = jwt.sign({ email: email }, config_1.default.JWT_SECRET, {
                                    expiresIn: 100000,
                                });
                                delete user.password;
                                response = __assign({ email: user.email, username: result.username }, { token: token });
                                return [2 /*return*/, res.status(200).json(response)];
                            }
                        }
                        return [2 /*return*/, res.status(404).json({ error: 'Wrong username or password' })];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(res.locals.user);
                return [2 /*return*/, res.status(400).json(res.locals.user)];
            });
        });
    };
    /**
     * Find user by email
     * @param userEmail: User's email
     */
    UserController.prototype.findUserByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            select: {
                                name: true, email: true, username: true, password: true,
                            },
                            where: { email: userEmail },
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user || false];
                }
            });
        });
    };
    UserController.prototype.comparePassword = function (password, userPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
                if (hashedPassword === userPassword) {
                    console.log({ hashed: hashedPassword, pwd: password });
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
