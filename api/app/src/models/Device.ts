import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, Required, UniqueItems, PropertyType } from "@tsed/common";
import { Hardware } from "./Hardware";
import { Document } from "mongoose";

export type DeviceDocument = Device & Document

export interface IDevice {
    _id?: string
    name: string
    hardware: Ref<Hardware>
    simPins: number
    pullInterval: number
    state: {[pin: string]: boolean}
}

@Model({
    collection: "devices"
})
export class Device {
    @ObjectID()
    _id?: string
    @Property() @Required() @UniqueItems() name!: string
    @Ref(Hardware) hardware!: Ref<Hardware>
    @Property() simPins!: number
    @Property() pullInterval!: number
    @Property() state!: {[pin: string]: boolean}
    // @PropertyType(Number) parallel: number = 1
}
