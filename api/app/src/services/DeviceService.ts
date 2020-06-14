import { MongooseModel,  } from "@tsed/mongoose";
import { Inject, Service } from "@tsed/common";
import { Device } from "../models/Device";

@Service()
export class DeviceService {
    @Inject(Device) 
    private Device!: MongooseModel<Device>;

    $onInit() {
        this.reload();
      }
    async reload(){
        const devices = await this.Device.find({}).exec();
        console.log(devices.length)
        if(devices.length === 0){

            this.upsert({
                hardware: "a",
                name: "b",
                state: {
                    "Pin-1":false,
                    "Pin-2": true
                },
                simPins: 1,
                pullInterval: 60000,
            })
        }
    }
    async upsert(device: Device): Promise<Device>{

        const model = new this.Device(device);
        await model.updateOne(device, {upsert: true})
        return model;
    }
    async all(): Promise<Device[]>{

        return await this.Device.find({}).populate("hardware").exec()
    }
    async byId(id: string | number): Promise<Device | null>{

        return this.Device.findById(id).populate("hardware").exec()
    }
    async byName(name: string){
        return this.Device.findOne({name: name}).exec();
    }
    async delete(id: string){
        return this.Device.deleteOne({_id: id}).exec();
    }
}