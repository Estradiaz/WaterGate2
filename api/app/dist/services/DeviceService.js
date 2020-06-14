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
exports.DeviceService = void 0;
const common_1 = require("@tsed/common");
const Device_1 = require("../models/Device");
let DeviceService = /** @class */ (() => {
    let DeviceService = class DeviceService {
        $onInit() {
            this.reload();
        }
        reload() {
            return __awaiter(this, void 0, void 0, function* () {
                const devices = yield this.Device.find({}).exec();
                console.log(devices.length);
                if (devices.length === 0) {
                    this.upsert({
                        hardware: "a",
                        name: "b",
                        state: {
                            "Pin-1": false,
                            "Pin-2": true
                        },
                        simPins: 1,
                        pullInterval: 60000,
                    });
                }
            });
        }
        upsert(device) {
            return __awaiter(this, void 0, void 0, function* () {
                const model = new this.Device(device);
                yield model.updateOne(device, { upsert: true });
                return model;
            });
        }
        all() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.Device.find({}).populate("hardware").exec();
            });
        }
        byId(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.Device.findById(id).populate("hardware").exec();
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.Device.deleteOne({ _id: id }).exec();
            });
        }
    };
    __decorate([
        common_1.Inject(Device_1.Device),
        __metadata("design:type", Object)
    ], DeviceService.prototype, "Device", void 0);
    DeviceService = __decorate([
        common_1.Service()
    ], DeviceService);
    return DeviceService;
})();
exports.DeviceService = DeviceService;
