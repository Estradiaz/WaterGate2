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
exports.JobCtrl = void 0;
const common_1 = require("@tsed/common");
const DeviceService_1 = require("../services/DeviceService");
const JobService_1 = require("../services/JobService");
const Job_1 = require("../models/Job");
let JobCtrl = /** @class */ (() => {
    let JobCtrl = class JobCtrl {
        constructor(jobService, deviceService) {
            this.jobService = jobService;
            this.deviceService = deviceService;
        }
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.jobService.all();
            });
        }
        save(job) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.jobService.save(job);
            });
        }
        byId(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.jobService.byId(id);
            });
        }
        update(id, job) {
            return __awaiter(this, void 0, void 0, function* () {
                job._id = id;
                return this.jobService.save(job);
            });
        }
        deleteById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.jobService.delete(id);
            });
        }
    };
    __decorate([
        common_1.Get("/"),
        common_1.Status(200, { type: Job_1.Job, collectionType: Array }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], JobCtrl.prototype, "getAll", null);
    __decorate([
        common_1.Put("/"),
        common_1.Status(201, { type: Job_1.Job }),
        __param(0, common_1.BodyParams("job")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Job_1.Job]),
        __metadata("design:returntype", Promise)
    ], JobCtrl.prototype, "save", null);
    __decorate([
        common_1.Get("/:id"),
        common_1.Status(200, { type: Job_1.Job }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], JobCtrl.prototype, "byId", null);
    __decorate([
        common_1.Post("/:id"),
        common_1.Status(200, { type: Job_1.Job }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __param(1, common_1.BodyParams("job")), __param(1, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Job_1.Job]),
        __metadata("design:returntype", Promise)
    ], JobCtrl.prototype, "update", null);
    __decorate([
        common_1.Delete("/:id"),
        common_1.Status(200, { type: Job_1.Job }),
        __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], JobCtrl.prototype, "deleteById", null);
    JobCtrl = __decorate([
        common_1.Controller("/jobs"),
        __metadata("design:paramtypes", [JobService_1.JobService,
            DeviceService_1.DeviceService])
    ], JobCtrl);
    return JobCtrl;
})();
exports.JobCtrl = JobCtrl;
