
import mongoose from "mongoose";
import { Server } from "./server";

const db = mongoose.createConnection("mongodb://mongo:27017/garten", {useNewUrlParser: true})
db.on("error", (e) => {
    console.log(e)
})
db.on("open", ()=>{
    console.log("mongo opened")
});

const s = new Server()

s.start();