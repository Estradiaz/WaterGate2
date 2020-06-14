import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators"
import { DeviceState, DeviceStateDocument } from './types'
import Axios from 'axios'
import { replaceOrAdd } from '@/utils'

const url = "/rest/device-state"

@Module({
    namespaced: true
})
export class DeviceStateVuexModule extends VuexModule {

    deviceStates: DeviceStateDocument[] = []
    @Mutation
    setDeviceStates(deviceStates: DeviceStateDocument[]){
        this.deviceStates = deviceStates
    }
    @Action({commit: "setDeviceStates"})
    async pullAll(){
        return (await fetch(url)).json() 
    }


    @Mutation
    update_c(deviceState: DeviceStateDocument){

        replaceOrAdd(this.deviceStates, deviceState)
    }
    @Action({commit: "update_c"})
    async updateDeviceState(deviceState: DeviceState){

        console.log("entered vuex updateDev")
        const insertedDeviceState = await (deviceState._id? Axios.post : Axios.put)(url, {deviceState}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(insertedDeviceState)
        return insertedDeviceState.data
    }
}