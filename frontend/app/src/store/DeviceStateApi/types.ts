import { Device } from '../DeviceApi/types';

export type DeviceStateDocument = DeviceState & {_id: string}
export type DeviceState = {
    _id?: string
    name: string
    device: string | Device
    state: {[pin: string]: boolean}
}