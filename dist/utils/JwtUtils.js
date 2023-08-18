"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.verifyToken = exports.generateToken = void 0;
// jwtUtils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'your-secret-key'; // Replace with a strong secret key
const EXPIRATION_TIME = '1h';
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET_KEY);
};
exports.verifyToken = verifyToken;
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Authentication required' });
        return;
    }
    try {
        const decoded = (0, exports.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
