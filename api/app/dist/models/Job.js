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
exports.Job = void 0;
const mongoose_1 = require("@tsed/mongoose");
const common_1 = require("@tsed/common");
const DeviceState_1 = require("./DeviceState");
let Job = /** @class */ (() => {
    let Job = class Job {
        constructor() {
            this.autoRemove = false;
        }
    };
    __decorate([
        mongoose_1.ObjectID(),
        __metadata("design:type", String)
    ], Job.prototype, "_id", void 0);
    __decorate([
        common_1.Required(),
        common_1.Property(),
        __metadata("design:type", Date)
    ], Job.prototype, "sleepUntil", void 0);
    __decorate([
        common_1.Required(),
        common_1.Property(),
        __metadata("design:type", Number)
    ], Job.prototype, "duration", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", String)
    ], Job.prototype, "interval", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Date)
    ], Job.prototype, "repeatUntil", void 0);
    __decorate([
        common_1.Property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "autoRemove", void 0);
    __decorate([
        common_1.Required(),
        common_1.Property(),
        __metadata("design:type", String)
    ], Job.prototype, "name", void 0);
    __decorate([
        common_1.PropertyType(Date),
        __metadata("design:type", Array)
    ], Job.prototype, "casted", void 0);
    __decorate([
        mongoose_1.Ref(DeviceState_1.DeviceState),
        __metadata("design:type", Object)
    ], Job.prototype, "targetState", void 0);
    Job = __decorate([
        mongoose_1.Model({
            collection: "jobs",
        })
    ], Job);
    return Job;
})();
exports.Job = Job;
