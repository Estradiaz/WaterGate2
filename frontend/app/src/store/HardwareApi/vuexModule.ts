import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import Axios from 'axios';
import { Hardware, HardwareDocument } from './types';
import { replaceOrAdd } from '@/utils';

const apiUrl = "rest/hardware"

@Module({
    namespaced: true
})
export class HardwareVuexModule extends VuexModule {

    hardwares: HardwareDocument[] = []
    @Mutation
    setHardwares_c(hardwares: HardwareDocument[]){
        this.hardwares = hardwares
    }

    @Action({commit: "setHardwares_c"})
    async pullHardwares(){
        return (await fetch(apiUrl)).json() || []
    }

    @Mutation
    updateHardware_c(hardware: HardwareDocument){

        replaceOrAdd(this.hardwares, hardware);
    }
    @Action({commit: "updateHardware_c"})
    async updateHardware(hardware: Hardware){

        // wrap this in update util function 
        const url = hardware._id ? `${apiUrl}/${hardware._id}` : apiUrl
        let dd = await (hardware._id? Axios.post : Axios.put)(url, {hardware}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return dd.data
    }

    @Mutation
    removeOne_c(hardware: string | Hardware){
        const hw = typeof hardware == "string" ? {_id: hardware} : hardware;
        const index = this.hardwares.findIndex(item => item._id == hw._id);
        console.log("rm index", index, hw)
        if(index >= 0){
            this.hardwares.splice(index, 1);
        }
    }
    @Action({commit: "removeOne_c"})
    async removeHardware(hardware: string | Hardware){

        // wrap this in update util function 
        const url = typeof hardware == "string" ? `${apiUrl}/${hardware}` :`${apiUrl}/${hardware._id}`;
        let dd = await Axios.delete(url)
        console.log(dd)
        if(dd.data.deletedCount > 0){
            console.log("return", hardware)
            return hardware
        }
    }
}