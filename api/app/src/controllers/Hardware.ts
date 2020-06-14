import { Controller, Required, Status, Get, Put, Post, Delete, BodyParams, PathParams } from "@tsed/common";
import { HardwareService } from "../services/HardwareService";
import { Hardware } from "../models/Hardware";


@Controller("/hardware")
export class HardwareCtrl {

    constructor(
        private hardwareService: HardwareService
    ){}

    @Get("/")
    @Status(200,{type: Hardware})
    getAll(){

        return this.hardwareService.all()
    }
    @Get("/:id")
    @Status(200, {type: Hardware})
    getById(
        @PathParams("id") @Required() id: string
    ){
        return this.hardwareService.findById(id)
    }

    @Put("/")
    @Status(201, {type: Hardware})
    upsert(
        @BodyParams("hardware") @Required() hardware: Hardware
    ){
        return this.hardwareService.upsert(hardware);
    }
    @Post("/:id")
    @Status(200, {type: Hardware})
    update(
        @PathParams("id") @Required() id: string,
        @BodyParams("hardware") @Required() hardware: Hardware
    ){
        hardware._id = id;
        return this.hardwareService.upsert(hardware);
    }

    @Delete("/:id")
    @Status(200, {type: Hardware})
    remove(
        @PathParams("id") @Required() id: string
    ){

        return this.hardwareService.deleteById(id);
    }
}