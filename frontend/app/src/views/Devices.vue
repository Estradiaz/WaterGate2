<template>
    <v-container>
        <v-system-bar>
            <v-spacer />
            <v-toolbar-items>
                <AddDeviceBtn />
            </v-toolbar-items>
        </v-system-bar>
        <v-data-table
            :items="items"
            :headers="headers"
            group-by="hardware"
        >
            <template
                #item.actions="{item}"
            >
                <v-dialog v-model="editDialog">
                    <template #activator="{on}">
                        <v-btn small icon v-on="on">e</v-btn>
                    </template>
                    <AddDeviceForm :device="item" @cancel="editDialog=false"/>
                </v-dialog>
                <RemoveDialogBtn @remove="removeDevice" :item="item" />
            </template>
        </v-data-table>
    </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import { DeviceApi } from "../store/DeviceApi";
import AddDeviceBtn from "@/Buttons/AddDeviceBtn/index.vue";
import AddDeviceForm from "@/Forms/AddDeviceForm/index.vue";
import RemoveDialogBtn from "@/Buttons/RemoveDialogBtn/index.vue"
import { Device } from '../store/DeviceApi/types';
import { HardwareApi } from '../store/HardwareApi';
import { Hardware } from '../store/HardwareApi/types';


@Component<MainView>({
    async mounted(){
        console.log(this.$store.state)
        this.pullDevices()
    },
    components: {
        AddDeviceBtn,
        AddDeviceForm,
        RemoveDialogBtn
    }
})
export default class MainView extends Mixins(DeviceApi, HardwareApi){
 
    editDialog: boolean = false
    removeDialog: boolean = false
    get headers(){

        return (["name", "simPins", "pullInterval", "hardware", "state"])
        .map(i => ({
            text: i,
            value: i
        }))
        .concat({
            text: "actions",
            value: "actions"
        })
    }
    get items(){
        
        return (this.devices || []).map(device => {
            const hw = (this.hardwares || []).find(hw_ => hw_._id == device.hardware) as Hardware
            return {
                ...device,
                hardware: hw && `${hw.name} (${hw.pins} Pins)` || "...loading",
                state: Object.values(device.state).map(state => +state).reverse().join("")
            }
        })
    }
}
</script>