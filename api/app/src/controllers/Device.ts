import { Controller, Get, Delete, Post, Put, Status, Required, BodyParams, PathParams } from "@tsed/common";
import { DeviceService } from "../services/DeviceService";
import {Request, Response} from "express";
import { Device } from "../models/Device";
import { HardwareService } from "../services/HardwareService";

@Controller("/device")
export class DeviceCtrl {

    constructor(
        private deviceService: DeviceService,
        private hardwareService: HardwareService
    ){}
    
    @Get("/")
    @Status(200, {type: Device})
    async listAll(){

        return this.deviceService.all()
        // const hardwares = await this.hardwareService.all()
        // const waitable = (await this.deviceService.all())
        // .map(async device => ({
        //     ...device,
        //     hardware: await this.hardwareService.findById(device.hardware as string)
        // }))
        // return Promise.all(waitable);
    }
    @Get("/:id/:name")
    @Status(200, {type: Number})
    async getDeviceStateAsNumber(
        @PathParams("id") @Required() id: string,
        @PathParams("name") @Required() name: string
    ){
        if(!/status/i.test(id)){
            return await this.deviceService.byId(id)
        }
        const device = await this.deviceService.byName(name);
        if(!device) return "0"; //off
        const binStr = Object.keys(device.state)
        .sort((a,b) => +b - +a)
        .map((key) => +device.state[key])
        .reduce((s, curr) => {return s + curr}, "")
        return "" + parseInt(binStr, 2);
    }
    // @Get("/:id")
    // @Status(200, {type: Device})
    // async deviceById(
    //     @PathParams("id") @Required() id: string
    // ){

    //     const result = 
    //     return result
    // }
    
    @Put("/")
    @Status(201, {type: Device})
    async save(
        @BodyParams("device") @Required() device: Device
    ): Promise<Device>{

        return this.deviceService.upsert(device)
    }

    @Post("/:id")
    @Status(200, {type: Device})
    async update(
        @PathParams("id") @Required() id: string,
        @BodyParams("device") @Required() device: Device
    ): Promise<Device>{

        console.log(device)
        device._id = id;
        return this.deviceService.upsert(device);
    }

    @Get("/:id/:pin")
    @Status(200, {type: Device})
    async getDevicePinState(
        @PathParams("id") @Required() id: string,
        @PathParams("pin") @Required() pin: string
    ){

        const result = await this.deviceService.byId(id);
        if(result && !Number.isNaN(+pin)){
            return result.state[+pin]
        }
    }
    @Post(":id/:pin")
    @Status(200, {type: Device})
    async setDevicePinState(
        @PathParams("id") @Required() id: string,
        @PathParams("pin") @Required() pin: string,
        @BodyParams("state") @Required() state: boolean
    ){

        const result = await this.deviceService.byId(id);
        if(result && !Number.isNaN(+pin)){
            result.state[pin] = state
            this.deviceService.upsert(result);
        }
    }
    @Delete("/:id")
    @Status(200, {type: Device})
    async deleteById(
        @PathParams("id") @Required() id: string
    ){

        return this.deviceService.delete(id);
    }
}