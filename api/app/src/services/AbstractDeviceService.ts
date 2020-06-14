import { MongooseModel,  } from "@tsed/mongoose";
import { Inject, Service } from "@tsed/common";
import { Device } from "../models/Device";
import { Job } from "../models/Job";
import { AbstractDevice, AbstractDeviceDocument } from "../models/AbstractDevice";
import { DeviceState } from "../models/DeviceState";


@Service()
export class AbstractDeviceService {

    @Inject(AbstractDevice)
    private abstractDevice!: MongooseModel<AbstractDevice>


    async upsert(abstractDevice: AbstractDevice){

        const model = new this.abstractDevice(abstractDevice);
        await model.updateOne(abstractDevice, {upsert: true}).exec()
        return model;
    }

    all(): Promise<AbstractDeviceDocument[]>{

        return this.abstractDevice.find({}).exec()
    }

    findByName(name: string): Promise<AbstractDeviceDocument[]>{

        const $regex = new RegExp(name);
        return this.abstractDevice.find({name:{
            $regex,
            $options: "i"
        }}).exec()
    }
    findById(id: string): Promise<AbstractDeviceDocument | null>{

        return this.abstractDevice.findById(id).exec();
    }
    deleteById(id: string){

        return this.abstractDevice.deleteOne({_id: id}).exec()
    }
}