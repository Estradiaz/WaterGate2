import { Controller, Delete, Get, Post, Put, Status, Required, BodyParams, PathParams } from "@tsed/common";
import { LogService } from "../services/LogService";
import { Log } from "../models/Log";

@Controller("/log")
export class LogCtrl {

    constructor(
        private logService: LogService
    ){}

    @Get("/")
    @Status(200, {type: Log})
    async getAll(){

        return this.logService.all();
    }
    @Get("/:id")
    @Status(200, {type: Log})
    async getOneById(
        @PathParams("id") @Required() id: string
    ){

        return this.logService.findById(id);
    }

    @Put("/")
    @Status(201, {type: Log})
    async save(
        @BodyParams("log") @Required() log: Log
    ){
        return this.logService.upsert(log)
    }

    @Delete("/:id")
    @Status(200, {type: Log})
    async delete(
        @PathParams("id") @Required() id: string
    ){

        return this.logService.delete(id)
    }

    @Post("/:id")
    @Status(200, {type: Log})
    async update(
        @PathParams("id") @Required() id: string,
        @BodyParams("log") @Required() log: Log
    ){
        log._id = id;
        return this.logService.upsert(log);
    }
}