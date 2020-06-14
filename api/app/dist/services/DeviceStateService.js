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
exports.DeviceStateService = void 0;
const common_1 = require("@tsed/common");
const DeviceState_1 = require("../models/DeviceState");
let DeviceStateService = /** @class */ (() => {
    let DeviceStateService = class DeviceStateService {
        upsert(deviceState) {
            return __awaiter(this, void 0, void 0, function* () {
                const model = new this.deviceState(deviceState);
                yield model.updateOne(deviceState, { upsert: true }).exec();
                return model;
            });
        }
        all() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceState.find({}).exec();
            });
        }
        findById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceState.findById(id).exec();
            });
        }
        findByDevice(device) {
            return __awaiter(this, void 0, void 0, function* () {
                const device_id = typeof device == "string" ? device : device._id;
                return yield this.deviceState.find({ device_id }).exec();
            });
        }
        findByName(name) {
            return __awaiter(this, void 0, void 0, function* () {
                let $regex = new RegExp(name);
                const results = yield this.deviceState.find({ name: {
                        $regex,
                        $options: "i"
                    } }).exec();
                return results;
            });
        }
        deleteById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.deviceState.deleteOne({ _id: id }).exec();
            });
        }
    };
    __decorate([
        common_1.Inject(DeviceState_1.DeviceState),
        __metadata("design:type", Object)
    ], DeviceStateService.prototype, "deviceState", void 0);
    DeviceStateService = __decorate([
        common_1.Service()
    ], DeviceStateService);
    return DeviceStateService;
})();
exports.DeviceStateService = DeviceStateService;
