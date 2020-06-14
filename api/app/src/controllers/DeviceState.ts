import { Controller, BodyParams, PathParams, Required, Delete, Post, Get, Put, Status} from "@tsed/common";
import { DeviceStateService } from "../services/DeviceStateService";
import { DeviceState } from "../models/DeviceState";



@Controller("/device-state")
export class DeviceStateCtrl {
    
    constructor(
        private deviceStateService: DeviceStateService
    ){}

    @Get("/")
    @Status(200, {type: DeviceState})
    async getAll(

    ){
        return (await this.deviceStateService.all()) || []
    }

    @Get("/id/:id")
    @Status(200, {type: DeviceState})
    getById(
        @PathParams("id") @Required() id: string
    ){

        return this.deviceStateService.findById(id);
    }

    @Get("/name/:name")
    @Status(200, {type: DeviceState})
    getByName(
        @PathParams("name") @Required() name: string
    ){

        return this.deviceStateService.findByName(name);
    }
    @Put("/")
    @Status(201, {type: DeviceState})
    upsert(
        @BodyParams("deviceState") @Required deviceState: DeviceState
    ){
        console.log("state to add",deviceState.state)
        return this.deviceStateService.upsert(deviceState);
    }
    @Post("/:id")
    @Status(201, {type: DeviceState})
    update(
        @PathParams("id") @Required() id: string,
        @BodyParams("deviceState") @Required deviceState: DeviceState
    ){
        return this.deviceStateService.upsert(deviceState);
    }
    @Delete("/:id")
    @Status(200, {type: DeviceState})
    deleteById(
        @PathParams("id") @Required() id: string
    ){

        return this.deviceStateService.deleteById(id);
    }

}