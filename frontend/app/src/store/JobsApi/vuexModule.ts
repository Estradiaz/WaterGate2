import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import Axios from "axios";
import { Job, JobDocument } from './types';
import { replaceOrAdd } from '@/utils';

const apiUrl = "./rest/jobs";



@Module({
    namespaced: true
})
export class JobApiVuexModule extends VuexModule {

    jobs: JobDocument[] = []
    @Mutation
    setJobs_c(jobs: JobDocument[]){

        this.jobs = jobs
    }
    @Action({commit: "setJobs_c"})
    async pullAll(){

        const url = apiUrl
        const result = await Axios.get(url);
        return result.data
    }

    @Mutation
    updateJob_c(job: JobDocument){
        replaceOrAdd(this.jobs, job);
    }

    @Action({commit: "updateJob_c"})
    async updateJob(job: Job){

        console.log("updateJob", job)
        const url = job._id ? `${apiUrl}/${job._id}` : apiUrl;
        const result = await ( job._id ? Axios.post : Axios.put)(url, {job}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return result.data;
    }

    @Mutation
    removeOne_c(job: string | JobDocument){

        const id =(typeof job == "string"? job : job._id)
        const index = this.jobs.findIndex(j => j._id == id)
        console.log(id, index)
        if(index >= 0){
            this.jobs.splice(index, 1)
        }
    }
    @Action({commit: "removeOne_c"})
    async removeOne(job: string | JobDocument){

        const url = typeof job == "string" ? `${apiUrl}/job` : `${apiUrl}/${job._id}`;
        const result = await Axios.delete(url);
        console.log("result", result)
        if(result.data.deletedCount > 0){
            return job;
        }
        
    }
}