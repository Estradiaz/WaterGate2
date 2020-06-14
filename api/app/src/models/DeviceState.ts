import { Model, Ref, Unique, Indexed, ObjectID } from "@tsed/mongoose";
import { Property } from "@tsed/common";

export type DeviceStateID = string
export interface IDeviceState {
    _id?: string
    name: string
    device: string
    state: {[pin: string]: boolean}
}


@Model({
    collection: "device-state"
})
export class DeviceState {

    @ObjectID()
    _id?: string

    @Unique()
    @Property()
    name!: string

    @Property()
    device!: string

    @Property()
    state!: {[pin: string]: boolean}

}