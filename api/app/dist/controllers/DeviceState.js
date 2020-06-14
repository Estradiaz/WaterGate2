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
exports.DeviceStateCtrl = void 0;
const common_1 = require("@tsed/common");
const DeviceStateService_1 = require("../services/DeviceStateService");
const DeviceState_1 = require("../models/DeviceState");
let DeviceStateCtrl = /** @class */ (() => {
    let DeviceStateCtrl = class DeviceStateCtrl {
        constructor(deviceStateService) {
            this.deviceStateService = deviceStateService;
        }
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.deviceStateService.all()) || [];
            });
        }
        getById(id) {
            return this.deviceStateService.findById(id);
        }
        getByName(name) {
            return this.deviceStateService.findByName(name);
        }
        upsert(deviceState) {
            console.log("state to add", deviceState.state);
            return this.deviceStateService.upsert(deviceState);
        }
        update(id, deviceState) {
            return this.deviceStateService.upsert(deviceState);
        }
        deleteById(id) {
            return this.deviceStateService.deleteById(id);
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: DeviceState_1.DeviceState }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DeviceStateCtrl.prototype, "getAll", null);
    __decorate([
        common_1.Get("/id/:id"),
        common_1.Status(200, { type: DeviceState_1.DeviceState }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DeviceStateCtrl.prototype, "getById", null);
    __decorate([
        common_1.Get("/name/:name"),
        common_1.Status(200, { type: DeviceState_1.DeviceState }),
        __param(0, common_1.PathParams("name")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DeviceStateCtrl.prototype, "getByName", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: DeviceState_1.DeviceState }),
        __param(0, common_1.BodyParams("deviceState")), __param(0, common_1.Required),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DeviceState_1.DeviceState]),
        __metadata("design:returntype", void 0)
    ], DeviceStateCtrl.prototype, "upsert", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(201, { type: DeviceState_1.DeviceState }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("deviceState")), __param(1, common_1.Required),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, DeviceState_1.DeviceState]),
        __metadata("design:returntype", void 0)
    ], DeviceStateCtrl.prototype, "update", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: DeviceState_1.DeviceState }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DeviceStateCtrl.prototype, "deleteById", null);
    DeviceStateCtrl = __decorate([
        common_1.Controller("/device-state"),
        __metadata("design:paramtypes", [DeviceStateService_1.DeviceStateService])
    ], DeviceStateCtrl);
    return DeviceStateCtrl;
})();
exports.DeviceStateCtrl = DeviceStateCtrl;
