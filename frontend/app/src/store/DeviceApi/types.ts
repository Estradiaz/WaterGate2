import { Hardware } from '../HardwareApi/types'

export type DeviceDocument = Device & {_id: string}
export type Device = {
    
    _id?: string
    name: string
    hardware: string | Hardware
    simPins: number
    pullInterval: number
    state: PinState
    // @PropertyType(Number) parallel: number = 1
}

export type PinState = {
    [pin: string]: boolean
}
