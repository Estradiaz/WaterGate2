import { Controller, Delete, Get, Post, Put, Status, Required, BodyParams, PathParams } from "@tsed/common";
import { DeviceService } from "../services/DeviceService";
import {Request, Response} from "express";
import { Device } from "../models/Device";
import { JobService } from "../services/JobService";
import { Job } from "../models/Job";

@Controller("/jobs")
export class JobCtrl{

    constructor(
        private jobService: JobService,
        private deviceService: DeviceService
    ){}

    @Get("/")
    @Status(200, {type: Job, collectionType: Array})
    async getAll(){

        return this.jobService.all()
    }
    @Put("/")
    @Status(201, {type: Job})
    async save(
        @BodyParams("job") @Required() job: Job
    ): Promise<Job>{

        return this.jobService.save(job);
    }
    @Get("/:id")
    @Status(200, {type: Job})
    async byId(
        @PathParams("id") @Required() id: string
    ){
        return this.jobService.byId(id)
    }
    @Post("/:id")
    @Status(200, {type: Job})
    async update(
        @PathParams("id") @Required() id: string,
        @BodyParams("job") @Required() job: Job
    ): Promise<Job>{

        job._id = id
        return this.jobService.save(job)
    }

    @Delete("/:id")
    @Status(200, {type: Job})
    async deleteById(
        @PathParams("id") @Required() id: string
    ){
        return this.jobService.delete(id)
    }
}