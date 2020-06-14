import { Schema, model, Document, SchemaTypes } from "mongoose";
import { IDeviceState } from "./DeviceState";

export interface IJob extends Document {
    name: string
    sleepUntil: Date
    duration: number,
    targetState: string | IDeviceState
    casted?: Date[]
    interval: string
}

const jobSchema = new Schema({
    sleepUntil: Date,
    duration: Number,
    interval: String,
    repeatUntil: Date,
    autoRemove: Boolean,
    jobName: String,
    device: String,
    targetState: {type: SchemaTypes.ObjectId, ref: "DeviceState"}
})

export const Job = model<IJob>("Job", jobSchema, "jobs");