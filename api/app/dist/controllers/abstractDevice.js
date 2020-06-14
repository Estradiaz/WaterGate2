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
exports.AbstractDeviceCtrl = void 0;
const common_1 = require("@tsed/common");
const AbstractDeviceService_1 = require("../services/AbstractDeviceService");
const AbstractDevice_1 = require("../models/AbstractDevice");
let AbstractDeviceCtrl = /** @class */ (() => {
    let AbstractDeviceCtrl = class AbstractDeviceCtrl {
        constructor(abstractDeviceService) {
            this.abstractDeviceService = abstractDeviceService;
        }
        getAll() {
            return this.abstractDeviceService.all();
        }
        upsert(device) {
            return this.abstractDeviceService.upsert(device);
        }
        update(id, device) {
            device._id = id;
            return this.abstractDeviceService.upsert(device);
        }
        getById(id) {
            return this.abstractDeviceService.findById(id);
        }
        deleteById(id) {
            return this.abstractDeviceService.deleteById(id);
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: AbstractDevice_1.AbstractDevice }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AbstractDeviceCtrl.prototype, "getAll", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: AbstractDevice_1.AbstractDevice }),
        __param(0, common_1.BodyParams("abstractDevice")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AbstractDevice_1.AbstractDevice]),
        __metadata("design:returntype", void 0)
    ], AbstractDeviceCtrl.prototype, "upsert", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(201, { type: AbstractDevice_1.AbstractDevice }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("abstractDevice")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, AbstractDevice_1.AbstractDevice]),
        __metadata("design:returntype", void 0)
    ], AbstractDeviceCtrl.prototype, "update", null);
    __decorate([
        common_1.Get("/:id"),
        common_1.Status(200, { type: AbstractDevice_1.AbstractDevice }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], AbstractDeviceCtrl.prototype, "getById", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: AbstractDevice_1.AbstractDevice }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], AbstractDeviceCtrl.prototype, "deleteById", null);
    AbstractDeviceCtrl = __decorate([
        common_1.Controller("/abstract"),
        __metadata("design:paramtypes", [AbstractDeviceService_1.AbstractDeviceService])
    ], AbstractDeviceCtrl);
    return AbstractDeviceCtrl;
})();
exports.AbstractDeviceCtrl = AbstractDeviceCtrl;
