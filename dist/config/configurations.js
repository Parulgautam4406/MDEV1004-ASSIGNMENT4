"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://suraj_v:zoCy3qRgV46tkFgB@cluster0.botqmpn.mongodb.net/',
    port: process.env.PORT || '3000'
};
exports.default = config;
