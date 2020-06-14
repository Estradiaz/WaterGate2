import { Model, ObjectID, Schema, Ref } from "@tsed/mongoose";
import { Property, Required, UniqueItems, PropertyType } from "@tsed/common";
import { IDeviceState, DeviceState } from "./DeviceState";
import { Job, IJob } from "./Job";
import { Document } from "mongoose";

export type AbstractDeviceDocument = AbstractDevice & Document

export interface IAbstractDeviceModel {
    _id?:string
    name: string
    description?: string
    states: Ref<DeviceState>[]
    jobs: Ref<Job>[]
}

@Model({
    collection: "abstract-device"
})
export class AbstractDevice implements IAbstractDeviceModel {
    @ObjectID()
    _id?: string

    @Property()
    name!: string

    @Property()
    description?: string

    @Ref(DeviceState)
    states!: Ref<IDeviceState>[]

    @Ref(Job)
    jobs!: Ref<Job>[]
}