<template>
    <v-card>
        <v-card-text>
            <v-form ref="form">
                <v-container fill-height fluid>
                    <v-col cols="12" md="6">
                        <v-text-field
                            required
                            label="name*"
                            v-model="jobName"
                            :rules="[uniqueName]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            :items="deviceStates"
                            item-text="name"
                            item-value="_id"
                            v-model="selectedDeviceStateId"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-row>
                            <v-col cols="6">

                                <v-text-field
                                    label="sleepUntilDate"
                                    type="date"
                                    v-model="datum"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="sleepUntilTime"
                                    type="time"
                                    v-model="zeit"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="duration [m]"
                            v-model="duration"
                            type="number"
                            :rules="[min5]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="day of week (0 - 7) (0 or 7 is Sun) | * every"
                            :items="dowItems"
                            v-model="dow"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="month (1 - 12) | * every"
                            :items="monthItems"
                            v-model="month"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="day of month (1 - 31) | * every"
                            :items="domItems"
                            v-model="dom"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="hour (0 - 23) | * every"
                            :items="hourItems"
                            v-model="hour"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="minute (0 - 59) | * every"
                            :items="minuteItems"
                            v-model="minute"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="second (0 - 59) | * every"
                            :items="secondItems"
                            v-model="second"
                        ></v-select>
                    </v-col>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn text @click="cancel">Cancel</v-btn>
            <v-btn text @click="submit">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {Mixins, Component} from 'vue-property-decorator'
import { JobsApi } from '../../store/JobsApi';
import { DeviceStateApi } from '../../store/DeviceStateApi';
import { FormValidate } from '../../mixins/validate';
import { Job } from '../../store/JobsApi/types';

const MINUTE = 60000
@Component<AddJobForm>({

})
export default class AddJobForm extends Mixins(JobsApi, DeviceStateApi, FormValidate){
    selectedDeviceStateId: string = ""
    jobName: string = ""
    datum: string = ""
    zeit: string = ""
    duration: number = 10

    dow: string = "*"
    dowItems: string[] = Array.from({length: 8}, (_, i) => i.toString()).concat(['*']);

    dom: string = "*"
    domItems: string[] = Array.from({length: 31}, (_, i) => (i+1).toString()).concat(['*']);

    month: string = "*"
    monthItems: string[] = Array.from({length: 12}, (_, i) => (i+1).toString()).concat(['*']);

    hour: string = "*"
    hourItems: string[] = Array.from({length: 24}, (_, i) => (i).toString()).concat(['*']);

    miute: string = "*"
    minuteItems: string[] = Array.from({length: 60}, (_, i) => (i).toString()).concat(['*']);

    second: string = "*"
    secondItems: string[] = Array.from({length: 60}, (_, i) => (i).toString()).concat(['*']);

    getInterval(){

        return `${this.second} ${this.miute} ${this.hour} ${this.dom} ${this.month} ${this.dow}`
    }
    uniqueName(name: string){

        return !this.jobs.some(job => job.name == name) || `Name ${name} aleready taken`
    }
    min5(value: string){
        return 5 <= +value || `${value} has to be >= 5 !`
    }
    clear(){
        this.selectedDeviceStateId = ""
        this.jobName = ""
        this.datum = ""
        this.zeit = ""
        this.duration = 10
    }
    cancel(){
        this.clear()
        this.$emit("cancel")
    }
    submit(){
        if(this.validate()){
            console.log(this.selectedDeviceStateId)
            const job: Job = {
                name: this.jobName,
                duration: this.duration * MINUTE,
                targetState: this.selectedDeviceStateId,
                sleepUntil: new Date(),
                interval: this.getInterval()
            }
            this.updateJob(job);
            this.$emit("submit", job)
        }
    }
}
</script>