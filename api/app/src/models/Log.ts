import { Model, ObjectID } from "@tsed/mongoose";
import { Property } from "@tsed/common";

Model({
    collection: "logs"
})
export class Log {

    @ObjectID()
    _id?: string

    @Property()
    timestamp!: Date

    @Property() 
    source!: string

}