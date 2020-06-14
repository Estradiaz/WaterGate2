"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./server");
const db = mongoose_1.default.createConnection("mongodb://mongo:27017/garten", { useNewUrlParser: true });
db.on("error", (e) => {
    console.log(e);
});
db.on("open", () => {
    console.log("mongo opened");
});
const s = new server_1.Server();
s.start();
