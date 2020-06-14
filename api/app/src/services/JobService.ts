import { MongooseModel } from "@tsed/mongoose";
import { Service, Inject } from "@tsed/common";
import { Job } from "../models/Job";
import Axios from "axios";

@Service()
export class JobService {
    @Inject(Job)
    private Job!: MongooseModel<Job>

    $onInit(){}

    async save(job: Job){

        const model = new this.Job(job);
        await model.updateOne(job, {upsert: true})
        await Axios.get("http://jobs:3000/restart")
        return model
    }
    async query(options = {}){

        return this.Job.find(options).exec();
    }
    async all(){
        return this.Job.find({}).exec();
    }
    async byId(id: string){
        return this.Job.findById(id).exec()
    }
    async delete(id: string){
        return this.Job.deleteOne({ _id: id }).exec();
    }
}