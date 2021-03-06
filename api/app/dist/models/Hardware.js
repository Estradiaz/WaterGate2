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
exports.Hardware = void 0;
const mongoose_1 = require("@tsed/mongoose");
const common_1 = require("@tsed/common");
let Hardware = /** @class */ (() => {
    let Hardware = class Hardware {
    };
    __decorate([
        mongoose_1.ObjectID(),
        __metadata("design:type", String)
    ], Hardware.prototype, "_id", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", String)
    ], Hardware.prototype, "name", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Number)
    ], Hardware.prototype, "pins", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", String)
    ], Hardware.prototype, "IP4", void 0);
    Hardware = __decorate([
        mongoose_1.Model()
    ], Hardware);
    return Hardware;
})();
exports.Hardware = Hardware;
