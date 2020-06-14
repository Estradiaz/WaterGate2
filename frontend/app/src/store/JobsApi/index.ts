import { Component, Vue } from "vue-property-decorator";
import { JobApiVuexModule } from "./vuexModule";
import { Job, JobDocument } from './types';



@Component<JobsApi>({
    created(){
        if(!this.$store.hasModule(JobsApi.modulePath)){

            this.$store.registerModule(
                JobsApi.modulePath,
                JobApiVuexModule
            )
        }
    },
    mounted(){
        this.pullJobs()
    }
})
export class JobsApi extends Vue {
    static modulePath: string = "api/jobs"

    get jobs(): Job[] {
        console.log(this.$store.state)
        return this.$store.state[JobsApi.modulePath] &&
        this.$store.state[JobsApi.modulePath].jobs || [];
    }
    
    // get jobsDeviceMapped(): {[device_id: string]: Job[]}{

    //     const rtn: {[device_id: string]: Job[]} = {};
    //     this.jobs.forEach(job => {
    //         if(!rtn.hasOwnProperty(job.device)){
    //             rtn[job.device] = [job];
    //         } else {
    //             rtn[job.device].push(job)
    //         }
    //     })
    //     return rtn
    // }
    updateJob(job: Job){

        return this.$store.dispatch(
            `${JobsApi.modulePath}/updateJob`,
            job,
            {root: true}
        )
    }
    pullJobs(){
        return this.$store.dispatch(`${JobsApi.modulePath}/pullAll`, undefined, {root: true})
    }
    removeJob(job: string | JobDocument){

        return this.$store.dispatch(`${JobsApi.modulePath}/removeOne`, job, {root: true})
    }
}