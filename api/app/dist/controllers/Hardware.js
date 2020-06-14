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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareCtrl = void 0;
const common_1 = require("@tsed/common");
const HardwareService_1 = require("../services/HardwareService");
const Hardware_1 = require("../models/Hardware");
let HardwareCtrl = /** @class */ (() => {
    let HardwareCtrl = class HardwareCtrl {
        constructor(hardwareService) {
            this.hardwareService = hardwareService;
        }
        getAll() {
            return this.hardwareService.all();
        }
        getById(id) {
            return this.hardwareService.findById(id);
        }
        upsert(hardware) {
            return this.hardwareService.upsert(hardware);
        }
        update(id, hardware) {
            hardware._id = id;
            return this.hardwareService.upsert(hardware);
        }
        remove(id) {
            return this.hardwareService.deleteById(id);
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: Hardware_1.Hardware }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HardwareCtrl.prototype, "getAll", null);
    __decorate([
        common_1.Get("/:id"),
        common_1.Status(200, { type: Hardware_1.Hardware }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HardwareCtrl.prototype, "getById", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: Hardware_1.Hardware }),
        __param(0, common_1.BodyParams("hardware")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Hardware_1.Hardware]),
        __metadata("design:returntype", void 0)
    ], HardwareCtrl.prototype, "upsert", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(200, { type: Hardware_1.Hardware }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("hardware")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Hardware_1.Hardware]),
        __metadata("design:returntype", void 0)
    ], HardwareCtrl.prototype, "update", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: Hardware_1.Hardware }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HardwareCtrl.prototype, "remove", null);
    HardwareCtrl = __decorate([
        common_1.Controller("/hardware"),
        __metadata("design:paramtypes", [HardwareService_1.HardwareService])
    ], HardwareCtrl);
    return HardwareCtrl;
})();
exports.HardwareCtrl = HardwareCtrl;
