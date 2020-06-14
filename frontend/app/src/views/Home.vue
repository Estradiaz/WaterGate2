<template>
        <v-data-table
            :items="devices"
            :headers="headers"
        >
            <template #item.name="{item}">
                <v-text-field 
                    label="Device Name" 
                    :value="item.name"
                    @change="update($event, item, 'name')"
                />
            </template>
        </v-data-table>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import { DeviceApi } from "../store/DeviceApi";
type Device = {
    name: string,
    state: {[pin: number]: boolean}
}

@Component<MainView>({
    async mounted(){
        console.log(this.$store.state)
        this.pullDevices()
    }
})
export default class MainView extends Mixins(DeviceApi){
    
}
</script>