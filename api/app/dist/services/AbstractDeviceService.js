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
exports.AbstractDeviceService = void 0;
const common_1 = require("@tsed/common");
const AbstractDevice_1 = require("../models/AbstractDevice");
let AbstractDeviceService = /** @class */ (() => {
    let AbstractDeviceService = class AbstractDeviceService {
        upsert(abstractDevice) {
            return __awaiter(this, void 0, void 0, function* () {
                const model = new this.abstractDevice(abstractDevice);
                yield model.updateOne(abstractDevice, { upsert: true }).exec();
                return model;
            });
        }
        all() {
            return this.abstractDevice.find({}).exec();
        }
        findByName(name) {
            const $regex = new RegExp(name);
            return this.abstractDevice.find({ name: {
                    $regex,
                    $options: "i"
                } }).exec();
        }
        findById(id) {
            return this.abstractDevice.findById(id).exec();
        }
        deleteById(id) {
            return this.abstractDevice.deleteOne({ _id: id }).exec();
        }
    };
    __decorate([
        common_1.Inject(AbstractDevice_1.AbstractDevice),
        __metadata("design:type", Object)
    ], AbstractDeviceService.prototype, "abstractDevice", void 0);
    AbstractDeviceService = __decorate([
        common_1.Service()
    ], AbstractDeviceService);
    return AbstractDeviceService;
})();
exports.AbstractDeviceService = AbstractDeviceService;
