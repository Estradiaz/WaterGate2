import { VuexModule, Module, Action, Mutation, MutationAction } from "vuex-module-decorators";
import Axios from "axios";
import { Device, DeviceDocument } from './types';
import { replaceOrAdd } from '@/utils';

const apiUrl: string = "./rest/device"


@Module({
    namespaced: true
})
export class DeviceApiVeuxModule extends VuexModule {

    devices: DeviceDocument[] = []
    @Mutation
    setDevices(devices: DeviceDocument[]){
        this.devices = devices;
    }
    
    @Action({commit: 'setDevices'})
    async pullDevices(){
        const url = `${apiUrl}`
        console.log(fetch)
        // return (await Axios.get<Device[]>(url)).data
        return await (await fetch(url)).json()
    }
    
    @Mutation
    updateDevice_c(device: DeviceDocument){
        
        replaceOrAdd(this.devices, device)
    }
    @Action({commit: 'updateDevice_c'})
    async update(device: Device){
        const url = device._id ? `${apiUrl}/${device._id}` : apiUrl
        let dd = await (device._id? Axios.post : Axios.put)(url, {device}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(dd)
        return dd.data
    }
    
    @Mutation
    removeOne_c(device: string | DeviceDocument){

        const dv = typeof device == "string" ? device : device._id
        const index = this.devices.findIndex(device => device._id == dv)
        this.devices.splice(index, 1);
    }

    @Action({commit: "removeOne_c"})
    async removeDevice(device: string | DeviceDocument){

        console.log("remove device", device)
        const url = typeof device == "string" ? `${apiUrl}/${device}` : `${apiUrl}/${device._id}`;
        const result = await Axios.delete(url);
        if(result.data.deletedCount > 0){
            return device
        }
    }
    
}