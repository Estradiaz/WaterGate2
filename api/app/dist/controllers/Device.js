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
exports.DeviceCtrl = void 0;
const common_1 = require("@tsed/common");
const DeviceService_1 = require("../services/DeviceService");
const Device_1 = require("../models/Device");
const HardwareService_1 = require("../services/HardwareService");
let DeviceCtrl = /** @class */ (() => {
    let DeviceCtrl = class DeviceCtrl {
        constructor(deviceService, hardwareService) {
            this.deviceService = deviceService;
            this.hardwareService = hardwareService;
        }
        listAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceService.all();
                // const hardwares = await this.hardwareService.all()
                // const waitable = (await this.deviceService.all())
                // .map(async device => ({
                //     ...device,
                //     hardware: await this.hardwareService.findById(device.hardware as string)
                // }))
                // return Promise.all(waitable);
            });
        }
        deviceById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.deviceService.byId(id);
                return result;
            });
        }
        save(device) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceService.upsert(device);
            });
        }
        update(id, device) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(device);
                device._id = id;
                return this.deviceService.upsert(device);
            });
        }
        getDevicePinState(id, pin) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.deviceService.byId(id);
                if (result && !Number.isNaN(+pin)) {
                    return result.state[+pin];
                }
            });
        }
        setDevicePinState(id, pin, state) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.deviceService.byId(id);
                if (result && !Number.isNaN(+pin)) {
                    result.state[pin] = state;
                    this.deviceService.upsert(result);
                }
            });
        }
        deleteById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceService.delete(id);
            });
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: Device_1.Device }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "listAll", null);
    __decorate([
        common_1.Get("/:id"),
        common_1.Status(200, { type: Device_1.Device }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "deviceById", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: Device_1.Device }),
        __param(0, common_1.BodyParams("device")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Device_1.Device]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "save", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(200, { type: Device_1.Device }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("device")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Device_1.Device]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "update", null);
    __decorate([
        common_1.Get("/:id/:pin"),
        common_1.Status(200, { type: Device_1.Device }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.PathParams("pin")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "getDevicePinState", null);
    __decorate([
        common_1.Post(":id/:pin"),
        common_1.Status(200, { type: Device_1.Device }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.PathParams("pin")), __param(1, common_1.Required()),
        __param(2, common_1.BodyParams("state")), __param(2, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Boolean]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "setDevicePinState", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: Device_1.Device }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DeviceCtrl.prototype, "deleteById", null);
    DeviceCtrl = __decorate([
        common_1.Controller("/device"),
        __metadata("design:paramtypes", [DeviceService_1.DeviceService,
            HardwareService_1.HardwareService])
    ], DeviceCtrl);
    return DeviceCtrl;
})();
exports.DeviceCtrl = DeviceCtrl;
