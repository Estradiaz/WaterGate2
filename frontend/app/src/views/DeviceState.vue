<template>
    <v-container>
        <v-system-bar
        >
            <v-spacer />
            <v-toolbar-items>
                <AddDeviceStateBtn />
            </v-toolbar-items>
        </v-system-bar>
        <v-data-table 
            :headers="headers"
            :items="items"
            fill-height
            group-by="device"
        >
            <template #item.actions="{item}">
                <v-btn icon small>E</v-btn>
                <RemoveDialogBtn @remove="removeDeviceState" :item="item" />
            </template>
        </v-data-table>
    </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { DeviceStateApi } from "../store/DeviceStateApi";
import AddDeviceStateBtn from "@/Buttons/AddDeviceStateBtn/index.vue";
import RemoveDialogBtn from "@/Buttons/RemoveDialogBtn/index.vue";
import { DeviceApi } from '../store/DeviceApi';
import { Device } from '../store/DeviceApi/types';
import { capitalizeFirst } from "../utils";
@Component<DeviceStateView>({
    components: {
        AddDeviceStateBtn,
        RemoveDialogBtn
    }
})
export default class DeviceStateView extends Mixins(DeviceApi, DeviceStateApi){
    get items(){
        return (this.deviceStates || []).map(state => ({
            ...state,
            device: (this.devices.find(device => device._id == state.device) as Device).name,
            state: Object.values(state.state).map(x=>+x).reverse().join(""),
        }))
    }
    get headers(){
        return [
            "name",
            "device",
            "state",
        ]
        .map(value => ({text: capitalizeFirst(value), value}))
        .concat([
            {
                text: "Actions",
                value: "actions"
            }
        ])
    }
}
</script>