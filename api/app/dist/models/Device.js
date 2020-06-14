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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const mongoose_1 = require("@tsed/mongoose");
const common_1 = require("@tsed/common");
const Hardware_1 = require("./Hardware");
let Device = /** @class */ (() => {
    let Device = class Device {
    };
    __decorate([
        mongoose_1.ObjectID(),
        __metadata("design:type", String)
    ], Device.prototype, "_id", void 0);
    __decorate([
        common_1.Property(),
        common_1.Required(),
        common_1.UniqueItems(),
        __metadata("design:type", String)
    ], Device.prototype, "name", void 0);
    __decorate([
        mongoose_1.Ref(Hardware_1.Hardware),
        __metadata("design:type", Object)
    ], Device.prototype, "hardware", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Number)
    ], Device.prototype, "simPins", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Number)
    ], Device.prototype, "pullInterval", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Object)
    ], Device.prototype, "state", void 0);
    Device = __decorate([
        mongoose_1.Model({
            collection: "devices"
        })
    ], Device);
    return Device;
})();
exports.Device = Device;
