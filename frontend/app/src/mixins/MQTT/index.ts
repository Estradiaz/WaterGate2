import mqtt from "mqtt";

const client = mqtt.connect('mqtt://localhost:1883')


client.on("connect", function onConnect(packet: mqtt.Packet){
    console.log("connected")
})

client.on("message", function onMessage(cb: mqtt.OnMessageCallback){
    console.log("message")
})