import { MongoCron } from "mongodb-cron";
import mongoose from "mongoose";


import express, { Response } from "express";
import { IJob, Job, Device, Hardware, DeviceState, IDeviceState, IDevice, PinState } from "./models";


const connections: Response[] = [] 
let cron: null | MongoCron = null

mongoose.connect("mongodb://mongo:27017/default", {useNewUrlParser: true})
.then(async mongClient => {
    
    cron = new MongoCron(
    {
        collection: ()=>Job.collection,
        async onDocument(job: IJob){
            console.log("job", job)
            const jobPop: (IJob & {targetState: IDeviceState}) = 
            await new Job(job).populate({
                path: "targetState", 
                populate: {
                    path: "device",
                    model: Device
                }
            }).execPopulate() as (IJob & {targetState: IDeviceState})
            console.log("job", jobPop)
            const deviceState = jobPop.targetState as IDeviceState & {device: IDevice}
            const device = deviceState.device;
            console.log("targetState", deviceState.state, Array.isArray(deviceState.state), deviceState.state[0])
            device.state = (deviceState.state as unknown as Array<PinState>)[0];
            (new Device(device))
            .update(device, {overwrite: true}).exec()
            // device.state = job.targetState;
            // await device.updateOne(device, {upsert: true})
            console.log(await Device.findById(device._id))
            connections.forEach(connection => {
                connection.write("pull")
            })
        },
        onError: function(error){
            console.log("error", error)
        },
        onStart(...args: any[]){
            console.log("started")
        },
        
    })
    cron.start()
    // console.log(await Device.find().exec())
})

const app = express();

app.get("/", (req, res) => {

    console.log("request connection from job manager")
    res.on("close", ()=>{

        let spliceIdx: number = connections.findIndex(item => res === item);
        connections.splice(spliceIdx, 1);
        res.end()
    })

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();
    connections.push(res);
    res.write("hello")
})

app.get("/stop", async (req, res)=> {

    if(cron){

        await cron.stop()
        res.status(200);
    } else {
        res.status(501)
    }
    res.end()
})
app.get("/start", async (req, res)=> {

    if(cron){

        await cron.start()
        res.status(200);
    } else {
        res.status(501)
    }
    res.end()
})

app.get("/restart", async (req, res)=> {

    if(cron){
        console.log("restart")
        await cron.stop()
        await cron.start()
        console.log("restarted")
        res.status(200);
    } else {
        res.status(501)
    }
    res.end()
})




app.listen(3000, ()=>{
    console.log("runs jobs sse")
})
