"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAll = (folderPath) => {
    let response = [];
    const allthings = fs_1.default.readdirSync(folderPath);
    allthings.forEach(file => {
        const fullpath = path_1.default.join(folderPath, file);
        if (fs_1.default.statSync(fullpath).isDirectory()) {
            response = response.concat((0, exports.getAll)(fullpath));
        }
        else {
            response.push(fullpath);
        }
    });
    return response;
};
exports.getAll = getAll;
