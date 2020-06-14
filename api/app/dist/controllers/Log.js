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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.LogCtrl = void 0;
const common_1 = require("@tsed/common");
const LogService_1 = require("../services/LogService");
const Log_1 = require("../models/Log");
let LogCtrl = /** @class */ (() => {
    let LogCtrl = class LogCtrl {
        constructor(logService) {
            this.logService = logService;
        }
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.logService.all();
            });
        }
        getOneById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.logService.findById(id);
            });
        }
        save(log) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.logService.upsert(log);
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.logService.delete(id);
            });
        }
        update(id, log) {
            return __awaiter(this, void 0, void 0, function* () {
                log._id = id;
                return this.logService.upsert(log);
            });
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: Log_1.Log }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LogCtrl.prototype, "getAll", null);
    __decorate([
        common_1.Get("/:id"),
        common_1.Status(200, { type: Log_1.Log }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], LogCtrl.prototype, "getOneById", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: Log_1.Log }),
        __param(0, common_1.BodyParams("log")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Log_1.Log]),
        __metadata("design:returntype", Promise)
    ], LogCtrl.prototype, "save", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: Log_1.Log }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], LogCtrl.prototype, "delete", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(200, { type: Log_1.Log }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("log")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Log_1.Log]),
        __metadata("design:returntype", Promise)
    ], LogCtrl.prototype, "update", null);
    LogCtrl = __decorate([
        common_1.Controller("/log"),
        __metadata("design:paramtypes", [LogService_1.LogService])
    ], LogCtrl);
    return LogCtrl;
})();
exports.LogCtrl = LogCtrl;
