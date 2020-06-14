export type Job = {
    _id?: string
    name: string
    sleepUntil: Date
    duration: number,
    targetState: string
    casted?: Date[]
    interval: string
}

export type JobDocument = Job & {_id: string}