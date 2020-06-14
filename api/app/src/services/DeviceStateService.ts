import { Service, Inject } from "@tsed/common";
import { MongooseModel, Ref } from "@tsed/mongoose";
import { DeviceState } from "../models/DeviceState";
import { Document } from "mongoose";
import { Device, DeviceDocument } from "../models/Device";

type DeviceStateDocument = DeviceState & Document

@Service()
export class DeviceStateService {

    @Inject(DeviceState)
    private deviceState!: MongooseModel<DeviceState>

    async upsert(deviceState: DeviceState): Promise<DeviceStateDocument> {

        const model = new this.deviceState(deviceState);
        await model.updateOne(deviceState, {upsert: true}).exec();
        return model
    }

    async all(): Promise<(DeviceStateDocument)[]> {

        return this.deviceState.find({}).exec();
    }

    async findById(id: string){
        return this.deviceState.findById(id).exec()
    }
    async findByDevice(device: Ref<DeviceDocument>){

        const device_id: string = typeof device == "string" ? device:device._id
        return await this.deviceState.find({device_id}).exec()
    }
    async findByName(name: string){
        let $regex = new RegExp(name);
        const results = await this.deviceState.find({name: {
            $regex,
            $options: "i"
        }}).exec()

        return results
    }
    async deleteById(id: string){

        return this.deviceState.deleteOne({_id: id}).exec()
    }
}