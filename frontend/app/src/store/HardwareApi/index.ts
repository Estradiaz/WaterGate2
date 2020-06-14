import { Vue, Component } from "vue-property-decorator";
import { Hardware } from './types';
import { HardwareVuexModule } from './vuexModule';

@Component<HardwareApi>({
    created(){
        if(!this.$store.hasModule(HardwareApi.modulePath)){
            this.$store.registerModule(
                HardwareApi.modulePath,
                HardwareVuexModule
            )
        }
    },
    mounted(){
        this.pullHardwares()
    }
})
export class HardwareApi extends Vue {
    static modulePath: string = "api/hardware"
    get hardwares(): Hardware[] {
        return this.$store.state[HardwareApi.modulePath].hardwares || []
    }
    pullHardwares(){
        return this.$store.dispatch(
            `${HardwareApi.modulePath}/pullHardwares`,
            undefined,
            {root: true}
        )
    }
    updateHardware(hardware: Hardware){

        return this.$store.dispatch(
            `${HardwareApi.modulePath}/updateHardware`,
            hardware,
            {root: true}
        )
    }
    removeHardware(hardware: string | Hardware){
        return this.$store.dispatch(
            `${HardwareApi.modulePath}/removeHardware`,
            hardware,
            {root: true}
        )
    }
}