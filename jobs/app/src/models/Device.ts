import { Schema, model, Document, SchemaTypes } from "mongoose";
import { ObjectID, ObjectId } from "mongodb";

export type PinState = {
    [pin: string]: boolean
}
export interface IDevice extends Document {
    name: string
    hardware: string | unknown
    simPins: number,
    pullInterval: number
    state: PinState
    // @PropertyType(Number) parallel: number = 1
}

const deviceSchema = new Schema({
    name: String,
    hardware: {type: SchemaTypes.ObjectId, ref: "Device"},
    simPins: Number,
    pullInterval: Number,
    state: Object,
})

export const Device = model<IDevice>("Device", deviceSchema, "devices")