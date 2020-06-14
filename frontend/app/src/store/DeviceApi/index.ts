import { Component, Vue } from "vue-property-decorator";
import { DeviceApiVeuxModule } from "./vuexModule";
import { Device } from './types';

@Component<DeviceApi>({
    created(){

        console.log("created", this.$store.hasModule(DeviceApi.modulePath))
        if(!this.$store.hasModule(DeviceApi.modulePath)){
            this.$store.registerModule(
                DeviceApi.modulePath,
                DeviceApiVeuxModule
            )
        }
    },
    mounted(){
        this.pullDevices()
    }
})
export class DeviceApi extends Vue {
    static modulePath: string = "api/device"
    get devices(): Device[]{
        return this.$store.state &&
        this.$store.state[
            DeviceApi.modulePath
        ].devices || []
    }
    
    updateDevice(device: Device){
        
        this.$store.dispatch(`${DeviceApi.modulePath}/update`, device, {root: true})
    }
    pullDevices(){
        this.$store.dispatch(`${DeviceApi.modulePath}/pullDevices`, null, {root:true})
    }
    removeDevice(device: string | Device){

        return this.$store.dispatch(
            `${DeviceApi.modulePath}/removeDevice`, device, {root: true}
        )
    }
}