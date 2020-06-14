"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@tsed/common");
const Log_1 = require("../models/Log");
let LogService = /** @class */ (() => {
    let LogService = class LogService {
        upsert(log) {
            return __awaiter(this, void 0, void 0, function* () {
                const model = new this.Log(log);
                yield model.updateOne(log, { upsert: true });
                return model;
            });
        }
        all() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.Log.find({}).exec();
            });
        }
        findById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.Log.findById(id).exec();
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.Log.deleteOne({ id }).exec();
            });
        }
    };
    __decorate([
        common_1.Inject(Log_1.Log),
        __metadata("design:type", Object)
    ], LogService.prototype, "Log", void 0);
    LogService = __decorate([
        common_1.Service()
    ], LogService);
    return LogService;
})();
exports.LogService = LogService;
