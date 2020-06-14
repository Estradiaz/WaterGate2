import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, PropertyType, Required } from "@tsed/common";
import { Device } from "./Device";
import { DeviceState } from "./DeviceState";

export interface IJob {
    _id?: string
    name: string
    sleepUntil: Date
    duration: number,
    targetState: Ref<DeviceState>
}

@Model({
    collection: "jobs",
})
export class Job {

    @ObjectID()
    _id?: string

    @Required()
    @Property() 
    sleepUntil!: Date

    @Required()
    @Property()
    duration!: number

    @Property() 
    interval?: string

    @Property() 
    repeatUntil?: Date

    @Property() 
    autoRemove: boolean = false

    @Required()
    @Property() 
    name!: string

    @PropertyType(Date)
    casted?: Array<Date>

    @Ref(DeviceState)
    targetState!: Ref<DeviceState>
}