import { Service, Inject } from "@tsed/common";
import { Hardware, HardwareDocument } from "../models/Hardware";
import { MongooseModel } from "@tsed/mongoose";


@Service()
export class HardwareService {

    @Inject(Hardware)
    private hardware!: MongooseModel<Hardware>

    all(): Promise<HardwareDocument[]>{

        return this.hardware.find({}).exec();
    }

    findByName(name: string){

        const $regex = new RegExp(name)
        return this.hardware.find({name: {
            $regex,
            $options: "i"
        }}).exec()
    }
    findById(id: string): Promise<HardwareDocument | null>{
        return this.hardware.findById(id).exec();
    }
    async upsert(hardware: Hardware){

        const model = new this.hardware(hardware);
        await model.updateOne(hardware, {upsert: true});
        return model;
    }
    deleteById(id: string){
        return this.hardware.deleteOne({_id: id});
    }
}