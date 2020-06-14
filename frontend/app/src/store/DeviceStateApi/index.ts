import { Component, Vue } from "vue-property-decorator";
import { DeviceStateVuexModule } from "./vuexModule";
import { DeviceState } from './types';
@Component<DeviceStateApi>({

    created(){
        if(!this.$store.hasModule(DeviceStateApi.modulePath)){

            this.$store.registerModule(
                DeviceStateApi.modulePath,
                DeviceStateVuexModule
            )
        }
    },
    mounted(){
        this.pullAllDeviceSates() // join this in updater ??
    }
})
export class DeviceStateApi extends Vue {

    static modulePath: string = "api/devicestate"
    pullAllDeviceSates(){
        return this.$store.dispatch(`${DeviceStateApi.modulePath}/pullAll`, undefined, {root: true})
    }
    get deviceStates(): DeviceState[]{

        return this.$store.state[DeviceStateApi.modulePath].deviceStates || []
    }
    updateDeviceState(deviceState: DeviceState){

        console.log("uipdatedevicestate", deviceState)
        return this.$store.dispatch(`${DeviceStateApi.modulePath}/updateDeviceState`, deviceState, {root: true})
    }
}