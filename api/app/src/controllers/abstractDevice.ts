import { Controller, Required, Status, Get, Put, Post, Delete, PathParams, BodyParams } from "@tsed/common";
import { AbstractDeviceService } from "../services/AbstractDeviceService";
import { AbstractDevice } from "../models/AbstractDevice";


@Controller("/abstract")
export class AbstractDeviceCtrl {

    constructor(
        private abstractDeviceService: AbstractDeviceService
    ){}

    @Get("/")
    @Status(200,{type: AbstractDevice})
    getAll(){

        return this.abstractDeviceService.all();
    }
    @Put("/")
    @Status(201, {type: AbstractDevice})
    upsert(
        @BodyParams("abstractDevice") @Required() device: AbstractDevice
    ){

        return this.abstractDeviceService.upsert(device);
    }
    @Post("/:id")
    @Status(201, {type: AbstractDevice})
    update(
        @PathParams("id") @Required() id: string,
        @BodyParams("abstractDevice") @Required() device: AbstractDevice
    ){

        device._id = id;
        return this.abstractDeviceService.upsert(device)
    }
    @Get("/:id")
    @Status(200, {type: AbstractDevice})
    getById(
        @PathParams("id") @Required() id: string
    ){
        return this.abstractDeviceService.findById(id)
    }

    @Delete("/:id")
    @Status(200, {type: AbstractDevice})
    deleteById(
        @PathParams("id") @Required() id: string
    ){
        return this.abstractDeviceService.deleteById(id)
    }
}