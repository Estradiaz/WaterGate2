import { Document, Schema, model } from "mongoose";

export interface IHardware extends Document {
    name: string,
    pins: number,
    IP4: string // pull or push
}

const hardwareSchema = new Schema({
    name: String,
    pins: Number,
    IP4: String
})

export const Hardware = model<IHardware>("Hardware", hardwareSchema, "hardware")