import { Schema, model, Document, Mongoose, SchemaTypes } from "mongoose";
import { IDevice } from "./Device";

export interface IDeviceState extends Document{
    name: string
    device: string | IDevice
    state: {[pin: string]: boolean}
}

const deviceStateSchema = new Schema({
    name: String,
    device: {type: SchemaTypes.ObjectId, ref: "Device"},
    state: Array
})

export const DeviceState = model<IDeviceState>("DeviceState", deviceStateSchema, "device-state");

