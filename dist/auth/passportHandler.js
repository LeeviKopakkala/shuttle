"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
// import passportApiKey from "passport-headerapikey";
var passport_jwt_1 = __importDefault(require("passport-jwt"));
var user_1 = require("../models/user");
var secrets_1 = require("../util/secrets");
var LocalStrategy = passport_local_1.default.Strategy;
var JwtStrategy = passport_jwt_1.default.Strategy;
var ExtractJwt = passport_jwt_1.default.ExtractJwt;
passport_1.default.use(new LocalStrategy({ usernameField: "username" }, function (username, password, done) {
    user_1.User.findOne({ username: username.toLowerCase() }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: "username " + username + " not found." });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid username or password." });
        });
    });
}));
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secrets_1.JWT_SECRET
}, function (jwtToken, done) {
    user_1.User.findOne({ username: jwtToken.username }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtToken);
        }
        else {
            return done(undefined, false);
        }
    });
}));
