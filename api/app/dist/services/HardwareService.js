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
exports.HardwareService = void 0;
const common_1 = require("@tsed/common");
const Hardware_1 = require("../models/Hardware");
let HardwareService = /** @class */ (() => {
    let HardwareService = class HardwareService {
        all() {
            return this.hardware.find({}).exec();
        }
        findByName(name) {
            const $regex = new RegExp(name);
            return this.hardware.find({ name: {
                    $regex,
                    $options: "i"
                } }).exec();
        }
        findById(id) {
            return this.hardware.findById(id).exec();
        }
        upsert(hardware) {
            return __awaiter(this, void 0, void 0, function* () {
                const model = new this.hardware(hardware);
                yield model.updateOne(hardware, { upsert: true });
                return model;
            });
        }
        deleteById(id) {
            return this.hardware.deleteOne({ _id: id });
        }
    };
    __decorate([
        common_1.Inject(Hardware_1.Hardware),
        __metadata("design:type", Object)
    ], HardwareService.prototype, "hardware", void 0);
    HardwareService = __decorate([
        common_1.Service()
    ], HardwareService);
    return HardwareService;
})();
exports.HardwareService = HardwareService;
