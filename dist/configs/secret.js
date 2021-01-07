"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.log('JWT_SECRET not set.');
    process.exit(1);
}
exports.default = JWT_SECRET;
