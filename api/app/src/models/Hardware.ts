import { Model, ObjectID } from "@tsed/mongoose";
import { Property } from "@tsed/common";
import { Document } from "mongoose";

export type HardwareDocument = Hardware & Document
export interface IHardware {
    _id?: string
    name: string,
    pins: number,
    IP4: string // pull or push
}
@Model()
export class Hardware {

    @ObjectID()
    _id?: string

    @Property()
    name!: string

    @Property()
    pins!: number

    @Property()
    IP4!: string
}