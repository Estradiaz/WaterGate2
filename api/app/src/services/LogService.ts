import { MongooseModel } from "@tsed/mongoose";
import { Service, Inject } from "@tsed/common";
import { Log } from "../models/Log";


@Service()
export class LogService {
    @Inject(Log)
    private Log!: MongooseModel<Log>;

    async upsert(log: Log){
        const model = new this.Log(log);
        await model.updateOne(log, {upsert: true});
        return model;
    }
    async all(){

        return this.Log.find({}).exec();
    }
    async findById(id: string){
        return this.Log.findById(id).exec();
    }
    async delete(id: string){

        return this.Log.deleteOne({id}).exec() 
    }
}