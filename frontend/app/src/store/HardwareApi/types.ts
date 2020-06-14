export type Hardware = {
    _id?: string
    name: string,
    pins: number,
    IP4: string // pull or push
}

export type HardwareDocument = Hardware & {_id: string}